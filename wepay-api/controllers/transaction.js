const User = require('../models/user');
const Seller = require('../models/seller');
const Activity = require('../models/activity');
const DepositRequest = require('../models/depositRequest');
const WithdrawRequest = require('../models/withdrawRequest');
const multer = require('multer');
const mongoose = require('mongoose');
const fs = require('fs');
const bcrypt = require('bcryptjs');
const depositDirectory = '../uploads/depositProcesses';
if (!fs.existsSync(depositDirectory)) {
	fs.mkdirSync(depositDirectory, { recursive: true });
}
const depositStorage = multer.diskStorage({
	destination: function(req, file, cb) {
		cb(null, 'uploads/depositProcesses');
	},
	filename: function(req, file, cb) {
		cb(null, Date.now() + '-' + file.originalname);
	}
});
const depositUpload = multer({ storage: depositStorage });

exports.depositRequest = async (req, res, next) => {
	try {
		const userId = req.user._id;
		depositUpload.single('processImageUrl')(req, res, async function(err) {
			if (err) {
				console.error(err);
				return res.status(500).json({ success: false, message: 'Error uploading file' });
			}
			const processImageUrl = req.file ? req.file.path : undefined;

			const { processType, senderName, senderPhone, amountValue, processNumber } = req.body;

			const session = await DepositRequest.startSession();
			session.startTransaction();
			const admin = await User.findOne({ role: 2 });
			const activity = new Activity({
				sender: admin._id,
				reciver: userId,
				senderAction: 'تحويل',
				reciverAction: 'شحن',
				amountValue,
				status: false
			});
			await activity.save();
			const depositRequest = new DepositRequest({
				processType,
				senderName,
				senderPhone,
				amountValue,
				processNumber,
				processImageUrl,
				user: userId,
				activity: activity._id
			});

			await depositRequest.save({ session });

			await session.commitTransaction();
			session.endSession();

			return res.status(200).json({
				success: true,
				message: 'تم استلام طلبك بنجاح سوف يتم التحقق من العملية خلال 1 ساعة ',
				data: depositRequest
			});
		});
	} catch (error) {
		await session.abortTransaction();
		session.endSession();

		next(error);
	}
};
exports.withdrawRequest = async (req, res, next) => {
	const { amountValue, processType, reciverName, reciverPhone, reciverCity } = req.body;
	const userId = req.user._id;

	let session = await mongoose.startSession();
	session.startTransaction();

	try {
		const user = await User.findById(userId).session(session);
		const admin = await User.findOne({ role: 2 }).session(session);

		if (user.balance < amountValue) {
			return res.status(400).json({
				success: false,
				message: 'عذراً رصيدك الحالي لا يكفي لإجراء هذه العملية'
			});
		}
		user.Balance -= amountValue;
		user.totalPayment += amountValue;
		await user.save();

		admin.Balance += amountValue;
		admin.totalIncome += amountValue;
		await admin.save();
		const activity = new Activity({
			sender: userId,
			reciver: admin._id,
			senderAction: 'سحب',
			reciverAction: 'شحن',
			senderDetails: `سحب رصيد من الحساب عن طريق ${processType}`,
			reciverDetails: `طلبية سحب رصيد عن طريق ${processType}`,
			amountValue,
			status: false
		});
		await activity.save();
		const withdrawRequest = new WithdrawRequest({
			amountValue,
			processType,
			reciverName,
			reciverPhone,
			reciverCity,
			user: userId,
			activity: activity._id
		});
		await withdrawRequest.save();

		await session.commitTransaction();
		session.endSession();

		return res.status(200).json({
			success: true,
			message: 'تم استلام طلبك بنجاح وسحب الرصيد من الحساب سوف يتم ارسال المبلغ خلال مدة أقصاها 24 ساعة',
			data: withdrawRequest
		});
	} catch (error) {
		await session.abortTransaction();
		session.endSession();

		next(error);
	}
};

exports.transferMoney = async (req, res, next) => {
	let session;
	try {
		session = await mongoose.startSession();
		session.startTransaction();

		const userId = req.user._id;
		const user = await User.findById(userId).session(session);
		const { qrcode, amountValue, pin } = req.body;
		const recipientUser = await User.findOne({ qrcode }).session(session);
		if (!recipientUser) {
			return res.status(402).json({
				success: false,
				message: 'عذراً إن الرمز المدخل غير صحيح , يرجى التأكد من صحة الرمز والمحاولة مرة أخرى'
			});
		}
		if (user.Balance < amountValue) {
			return res.status(402).json({
				success: false,
				message: 'عذراً لا تملك الرصيد الكافي لإجراء هذه العملية , قم بشحن حسابك والمحاولة من جديد '
			});
		}
		const isPinValid = await bcrypt.compare(pin, user.pin);
		if (!isPinValid) {
			return res.status(401).json({
				success: false,
				message: 'Invalid PIN'
			});
		}

		user.Balance -= amountValue;
		user.totalPayment += amountValue;

		recipientUser.totalIncome += amountValue;
		recipientUser.Balance += amountValue;

		await user.save({ session });
		await recipientUser.save({ session });
		let senderAction, reciverAction, senderDetails, reciverDetails;

		if (recipientUser.role === 1) {
			const seller = await Seller.findOne({ user: recipientUser._id });
			const storeName = seller.storeName;

			senderAction = 'دفع المتجر';
			reciverAction = 'استلام رصيد';

			senderDetails = `دفع لمتجر ${storeName}`;
			reciverDetails = `استلام رصيد من ${user.firstName} ${user.lastName} `;
		} else {
			senderAction = 'تحويل';
			reciverAction = 'استلام رصيد';

			senderDetails = `تحويل رصيد لحساب ${recipientUser.firstName} ${recipientUser.lastName}`;
			reciverDetails = `استلام رصيد من ${user.firstName} ${user.lastName} `;
		}
		const activity = new Activity({
			sender: userId,
			reciver: recipientUser._id,
			senderAction,
			reciverAction,
			senderDetails,
			reciverDetails,
			amountValue,
			status: true
		});

		await activity.save();
		await session.commitTransaction();
		session.endSession();

		res.status(200).json({ success: true, message: 'تم التحويل بنجاح وخصم المبلغ من حسابك ' });
	} catch (error) {
		await session.abortTransaction();
		session.endSession();
		next(error);
	}
};

exports.getActions = async (req, res, next) => {
	try {
		const userId = req.user._id;
		const perPage = 10;
		const page = req.query.page || 1;
		const actionType = req.query.actionType; // 'deposit', 'withdraw', 'transfer', 'storePaid', or 'balanceReceipt'

		let filter = {};
		if (actionType === 'deposit') {
			filter = { reciver: userId, reciverAction: 'شحن' };
		} else if (actionType === 'withdraw') {
			filter = { sender: userId, senderAction: 'سحب' };
		} else if (actionType === 'transfer') {
			filter = { sender: userId, senderAction: 'تحويل' };
		} else if (actionType === 'storePaid') {
			filter = { sender: userId, senderAction: 'دفع المتجر' };
		} else if (actionType === 'balanceReceipt') {
			filter = { reciver: userId, reciverAction: 'استلام الرصيد' };
		} else {
			filter = { $or: [ { sender: userId }, { reciver: userId } ] };
		}

		const actions = await Activity.find(filter)
			.sort({ createdAt: -1 })
			.skip(perPage * page - perPage)
			.limit(perPage);

		const count = await Activity.countDocuments(filter);
		const totalPages = Math.ceil(count / perPage);

		return res.status(200).json({
			success: true,
			message: actionType
				? `All ${actionType} Actions retrieved successfully`
				: `All Actions retrieved successfully`,
			data: actions,
			currentPage: page,
			totalPages: totalPages,
			totalItems: count
		});
	} catch (error) {
		next(error);
	}
};

exports.depositResponse = async (req, res, next) => {
	const processId = req.params.id;
	const userId = req.user._id;
	let session;
	try {
		session = await mongoose.startSession();
		session.startTransaction();

		const depositRequest = await DepositRequest.findById(processId).session(session);
		const activity = await Activity.findOne(depositRequest.activity).session();
		const reciver = await User.findById(depositRequest.user).session(session);
		const sender = await User.findById(userId).session(session);

		const amountValue = depositRequest.amountValue;

		activity.status = true;

		sender.totalPayment += amountValue;
		sender.Balance -= amountValue;

		reciver.Balance += amountValue;
		reciver.totalIncome += amountValue;

		await sender.save();
		await reciver.save();
		await activity.save();
		await session.commitTransaction();
		session.endSession();
		res
			.status(200)
			.json({ success: true, message: 'تم التحويل بنجاح وخصم المبلغ من حسابك ', sender, reciver, activity });
	} catch (error) {
		await session.abortTransaction();
		session.endSession();
		next(error);
	}
};

exports.withdrawResponse = async (req, res, next) => {
	try {
		const processId = req.params.id;
		const withDrawRequest = await WithdrawRequest.findById(processId).session(session);
		const activity = await Activity.findOne(withDrawRequest.activity).session();

		activity.status = true;
		await activity.save();

		res.status(201).json({ success: true, message: ' تمت العملية بنجاح ' });
	} catch (error) {
		next(error);
	}
};
