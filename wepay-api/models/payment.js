const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const paymentSchema = new Schema(
	{
		paymentType: { type: String, required: true },
		paymentValue: { type: Number, required: true },
		paymentDate: { type: Date },
		paymentInfo: { type: String, required: true },
		isPayable: { type: Number, enum: [ 0, 1 ], default: 0 },
		isMonthlyPayable: { type: Number, enum: [ 0, 1 ], default: 0 },
		user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
		paymentForUser: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: function() {
				return this.isPayable === 1;
			}
		}
	},
	{
		timestamps: true
	}
);

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;
