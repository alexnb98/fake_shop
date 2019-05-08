const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
	title: {
		type: String,
		required: true
	},
	price: {
		type: Number,
		required: true
	},
	description: {
		type: String
	},
	imageUrl: {
		type: String,
		required: true
	},
	companyRef: {
		type: Schema.Types.ObjectId,
		ref: 'companies'
	}
});

module.exports = Product = mongoose.model('product', ProductSchema);
