const mongoose = require('mongoose')
const Schema = mongoose.Schema

const RequestSchema = new Schema(
	{
		firstName: { type: String, required: true },
		lastName: { type: String, required: true },
		telephone: { type: String, required: true },
		email: { type: String, required: true },
		address: { type: String, required: true },
		plumber: { type: Schema.Types.ObjectId, ref: 'plumbers', required: true },
		service: { type: Schema.Types.ObjectId, ref: 'services' },
		issue: { type: String, required: true },
	},

	{ timestamps: true, collection: 'requests' }
)

module.exports = mongoose.model('requests', RequestSchema)
