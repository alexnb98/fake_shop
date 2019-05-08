const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CompanySchema = new Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	},
	products: [ { product: { type: Schema.Types.ObjectId, ref: 'products' } } ]
});

module.exports = Company = mongoose.model('company', CompanySchema);
