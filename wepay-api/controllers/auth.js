const User = require('../models/user');
const cookie = require('cookie');
const Seller = require('../models/seller');
const bcrypt = require('bcryptjs');
// const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const fs = require('fs');
const db = require('../util/database');
const Activity = require('../models/activity');
const profileStorage = multer.diskStorage({
	destination: function(req, file, cb) {
		cb(null, 'uploads/profilePictures');
	},
	filename: function(req, file, cb) {
		cb(null, Date.now() + '-' + file.originalname);
	}
});

const profileUpload = multer({ storage: profileStorage });

const sellerStorage = multer.diskStorage({
	destination: function(req, file, cb) {
		cb(null, 'uploads/storeImages');
	},
	filename: function(req, file, cb) {
		cb(null, Date.now() + '-' + file.originalname);
	}
});

const sellerUpload = multer({ storage: sellerStorage });

exports.signup = async (req, res, next) => {
	try {
		const { firstName, lastName, middleName, email, userName, phoneNumber, password, pin } = req.body;

		const existingUser = await User.findOne({ email });
		if (existingUser) {
			return res.status(400).json({ message: 'User with this email already exists' });
		}

		const hashedPin = await bcrypt.hash(pin, 10);

		const user = new User({
			firstName,
			lastName,
			middleName,
			email,
			userName,
			phoneNumber,
			password,
			pin: hashedPin
		});
		// const activationCode = Math.floor(Math.random() * 900000) + 100000;
		// const mailOptions = {
		// 	from: 'WE PAY',
		// 	to: user.email,
		// 	subject: 'Activate your account',
		// 	text: `Your activation code is ${activationCode}.`
		// };
		// await transporter.sendMail(mailOptions, (error, info) => {
		// 	if (error) console.log(error);
		// 	else console.log('mail sended');
		// });

		await user.save();
		const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY);

		res.setHeader(
			'set-Cookie',
			cookie.serialize('token', token, {
				httpOnly: true,
				secure: true,
				maxAge: 24 * 60 * 60, // 24 hours
				sameSite: 'none',
				path: '/'
			})
		);

		return res.status(201).json({ message: 'User created. Check your email for activation code.', token, user });
	} catch (error) {
		next(error);
	}
};

exports.login = async (req, res, next) => {
	try {
		const { email, password, pin } = req.body;

		let user = await User.findOne({ email });
		if (!user) {
			return res.status(401).json({ message: 'Invalid email' });
		}

		const isPasswordValid = await user.validatePassword(password);
		if (!isPasswordValid) {
			return res.status(401).json({ message: 'Invalid  password' });
		}

		const isPinValid = await bcrypt.compare(pin, user.pin);
		if (!isPinValid) {
			return res.status(401).json({ message: 'Invalid PIN' });
		}

		const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY);

		res.setHeader(
			'set-Cookie',
			cookie.serialize('token', token, {
				httpOnly: true,
				secure: true,
				maxAge: 24 * 60 * 60, // 24 hours
				sameSite: 'none',
				path: '/'
			})
		);
		user = await User.findOne({ email }, '-password -pin');
		res.json({ user });
	} catch (error) {
		next(error);
	}
};

exports.updateBasic = async (req, res, next) => {
	try {
		const userId = req.user._id;
		profileUpload.single('imgURL')(req, res, async function(err) {
			if (err) {
				console.error(err);
				return res.status(500).json({ success: false, message: 'Error uploading file' });
			}
			const { firstName , middleName , lastName , phoneNumber } = req.body;
			const imgURL = req.file ? req.file.path : undefined;

			const user = await User.findByIdAndUpdate(
				userId,
				{ firstName, lastName, middleName, phoneNumber, imgURL },
				{ new: true }
			);
			res
				.status(200)
				.json({ success: true, message: 'User information updated successfully', data: user, role: user.role });
		});
	} catch (error) {
		next(error);
	}
};

exports.updateSecurity = async (req, res, next) => {
	try {
		const userId = req.user._id;
		const { oldPassword, newPassword, newPin } = req.body;
		let user = await User.findById(userId);
		const isPasswordValid = await user.validatePassword(oldPassword);
		if (!isPasswordValid) {
			return res.status(401).json({ message: 'Invalid  password' });
		}
		let hashedPin;
		if (newPin !== undefined) {
			hashedPin = await bcrypt.hash(newPin, 10);
			user.pin = hashedPin;
		}
		if (newPassword !== undefined) user.password = newPassword;
		user.save();
		user = await User.findById(userId, '-password -pin');
		res.status(201).json({ message: 'security field updated', user, role: user.role });
	} catch (error) {
		console.log(error);
		next(error);
	}
};

exports.updatePaymentInfo = async (req, res, next) => {
	try {
		const userId = req.user._id;
		const { bemoBank, syriatelCash, haram } = req.body;
		const user = await User.findByIdAndUpdate(
			userId,
			{ bemoBank, syriatelCash, haram },
			{
				new: true,
				projection: {
					_id: 1,
					firstName: 1,
					lastName: 1,
					email: 1,
					userName: 1,
					role: 1,
					Balance: 1,
					totalIncome: 1,
					totalPayment: 1,
					bemoBank: 1,
					syriatelCash: 1,
					haram: 1
				}
			}
		);
		res.status(201).json({ success: true, message: 'User Payment information updated successfully', data: user });
	} catch (error) {
		next(error);
	}
};

exports.updateUserToSeller = async (req, res, next) => {
	try {
		const userId = req.user._id;
		sellerUpload.single('storeImgURL')(req, res, async function(err) {
			if (err) {
				console.error(err);
				return res.status(500).json({ success: false, message: 'Error uploading file' });
			}
			const { storeName, address, coo, city, storeType } = req.body;
			const storeImgURL = req.file ? req.file.path : undefined;
			const existUser = await User.findById(userId);
			if (existUser.Balance < 5000) {
				return res.status(401).json({
					message: 'you dont have enough money to be a seller please recharge your account and try again'
				});
			} else {
				const admin = await User.findOne({ role: 'admin' });
				existUser.Balance -= 5000;
				existUser.totalPayment -= 5000;
				admin.Balance += 5000;
				admin.totalIncome += 5000;
				existUser.save();
				admin.save();
				const activity = new Activity({
					sender: existUser._id,
					reciver: admin._id,
					senderAction: 'تحويل',
					reciverAction: 'استلام رصيد',
					senderDetails: `ترقية الحساب ل تاجر`,
					reciverDetails: `اجور ترقية حساب للمستخدم ${existUser.firstName} ${existUser.lastName}`,
					amountValue: 5000,
					status: true
				});
				activity.save();

				const seller = await new Seller({
					user: userId,
					storeName,
					address,
					coo,
					city,
					storeType,
					storeImgURL
				});
				await seller.save();

				let updatedUser = await User.findOneAndUpdate(
					{ _id: userId, role: { $nin: [ 'admin', 'seller' ] } },
					{ role: 'seller' },
					{ new: true }
				);

				if (!updatedUser) updatedUser = await User.findById(userId);
				res.status(200).json({
					success: true,
					message: 'Seller information created successfully',
					data: { seller, updatedUser, role: updatedUser.role }
				});
			}
		});
	} catch (error) {
		next(error);
	}
};

exports.logout = async (req, res, next) => {
	try {
		if (req.cookies.token) {
			res.setHeader(
				'set-Cookie',
				cookie.serialize('token', '', {
					httpOnly: true,
					secure: true,
					maxAge: 0,
					sameSite: 'none',
					path: '/'
				})
			);
			res.status(200).json({ message: 'Logged out successfully' });
		} else {
			res.status(404).json({ message: 'token not in cookie' });
		}
	} catch (error) {
		next(error);
	}
};

exports.updateUserToAdmin = async (req, res, next) => {
	try {
		const { userName } = req.body;
		const updatedUser = await User.findOneAndUpdate({ userName }, { role: 'admin' }, { new: true });
		res.status(200).json({
			success: true,
			message: 'user Updated to Admin successfully',
			user: updatedUser
		});
	} catch (error) {
		next();
	}
};
exports.getUserInfo = async (req, res, next) => {
	try {
		const userId = req.user._id;
		const user = await User.findById(userId, '-password -pin');
		res
			.status(200)
			.json({ success: true, message: 'user information retrived successfully', user, role: user.role });
	} catch (error) {
		next(error);
	}
};
