const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PlumberSchema = new Schema(
	{
		name: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		description: { type: String, required: true },
		telephone: { type: String, required: true },
		rating: { type: String, required: true },
		image: { type: String, required: true },
	},
	{ timestamps: true, collection: 'plumbers' }
)

module.exports = mongoose.model('plumbers', PlumberSchema)
