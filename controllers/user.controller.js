const { SuccessResponse, ErrorResponse } = require('../lib/helpers')
const User = require('../models/user')

class UserController {
	/**
	 * Create One Resource
	 * @param {import("express").Request} req
	 * @param {import("express").Response} res
	 */
	static createOne = async (req, res) => {
		const createdUser = await User.create(req.body).catch((error) => {
			ErrorResponse(res, 'error creating user', error)
		})

		SuccessResponse(res, 'user created', createdUser, 201)
	}

	/**
	 * Get All Resources
	 * @param {import("express").Request} req
	 * @param {import("express").Response} res
	 */
	static getAll = async (req, res) => {
		const users = await User.find().catch((error) => {
			return ErrorResponse(res, 'error finding users with model', error)
		})

		if (!users || users.length <= 0)
			return SuccessResponse(res, 'users are empty at the moment', users)

		return SuccessResponse(res, 'users found', users)
	}

	/**
	 * Get One Resource
	 * @param {import("express").Request} req
	 * @param {import("express").Response} res
	 */
	static getOne = async (req, res) => {
		const user = await User.findById(req.params.id).catch((error) => {
			return ErrorResponse(res, 'error finding user with model', error)
		})

		if (!user) return SuccessResponse(res, 'user not found', user)

		return SuccessResponse(res, 'user found', user)
	}

	/**
	 * Update One Resource
	 * @param {import("express").Request} req
	 * @param {import("express").Response} res
	 */
	static updateOne = async (req, res) => {
		const { email, role, password } = req.body
		const { id: _id } = req.params

		if (!email && !role && !password)
			return ErrorResponse(res, 'nothing sent to update', null, 200)

		const user = await User.findOne({ _id }).catch((error) => {
			return ErrorResponse(res, 'error while trying to find user', error)
		})

		if (!user) return ErrorResponse(res, `no user found`)

		const updatedUser = await User.updateOne(
			{ _id },
			{ email, password, role },
			{ returnDocument: true, returnOriginal: true, new: true }
		).catch((error) => {
			return ErrorResponse(res, 'error updating user', error)
		})

		SuccessResponse(res, 'user updated', updatedUser)
	}

	/**
	 * Delete One Resource
	 * @param {import("express").Request} req
	 * @param {import("express").Response} res
	 */
	static deleteOne = async (req, res) => {
		let user = await User.findByIdAndRemove(req.params.id, {
			returnDocument: true,
		}).catch((error) => {
			ErrorResponse(res, 'error deleting with user model', error)
		})

		if (!user) return ErrorResponse(res, 'user not found', null)

		return SuccessResponse(res, 'user deleted', user.email)
	}
}

module.exports = UserController
