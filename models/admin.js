const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const Schema = mongoose.Schema

const Admin = new Schema(
	{
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: { type: String, required: true },
	},
	{ timestamps: true, collection: 'admins' }
)

Admin.pre('save', async function (next) {
	if (this.password && this.isModified('password')) {
		const salt = await bcrypt
			.genSalt(10)
			.catch((error) => console.log('Bcrypt GenSalt', error))

		const hashedPassword = await bcrypt
			.hash(this.password, salt)
			.catch((error) => console.log('Bcrypt Hash', error))

		this.password = hashedPassword

		next()
	} else {
		throw new Error('fatal error while running `admins` pre save model middleware')
	}
})

//TODO rehash password after it is updated.

module.exports = mongoose.model('admins', Admin)
