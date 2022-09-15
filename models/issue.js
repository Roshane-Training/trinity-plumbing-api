const mongoose = require('mongoose')
const Schema = mongoose.Schema

const IssueSchema = new Schema(
	{
		product: { type: Schema.Types.ObjectId, ref: 'products', required: true },
		user: { type: Schema.Types.ObjectId, ref: 'users', required: true },
		plumber: { type: Schema.Types.ObjectId, ref: 'plumbers', required: true },
		issue: { type: String, required: true },
		status: {
			type: String,
			enum: ['active', 'inactive', 'resolved', 'rejected', 'pending'],
			required: true,
		},
	},
	{ timestamps: true, collection: 'issues' }
)

module.exports = mongoose.model('issues', IssueSchema)
