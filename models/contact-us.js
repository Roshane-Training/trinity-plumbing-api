const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ContactUsSchema = new Schema(
	{
		firstName: { type: String, required: true },
		lastName: { type: String },
		email: { type: String, required: true },
		phoneNumber: { type: Number },
		subject: { type: String, required: true },
		message: { type: String, required: true },
	},
	{ timestamps: true, collection: 'contact_us' }
)

module.exports = mongoose.model('ContactUs', ContactUsSchema)
