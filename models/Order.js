const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const OrderSchema = new Schema({
	userId: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: 'users'
	},
	userName: {
		type: String,
		required: true
	},
	userEmail: {
		type: String,
		required: true
	},
	userAddress: {
		type: String,
		required: true
	},
	cart: [ { product: {}, quantity: Number } ],
	date: {
		type: Date,
		default: Date.now
	}
});

module.exports = Order = mongoose.model('order', OrderSchema);
