const { SuccessResponse, ErrorResponse } = require('../lib/helpers')
const Admin = require('../models/admin')

// const SELECT_FILTER = '-password -__v'
const SELECT_FILTER = ''
class AdminController {
	/**
	 * Create One Resource
	 * @param {import("express").Request} req
	 * @param {import("express").Response} res
	 */
	static createOne = async (req, res) => {
		let createdAdmin

		try {
			createdAdmin = await Admin.create(req.body)
		} catch (error) {
			return ErrorResponse(res, 'error creating user', error)
		}

		return SuccessResponse(res, 'user created', createdAdmin, 201)
	}

	/**
	 * Get All Resources
	 * @param {import("express").Request} req
	 * @param {import("express").Response} res
	 */
	static getAll = async (req, res) => {
		let admins

		try {
			admins = await Admin.find().select(SELECT_FILTER)
		} catch (error) {
			return ErrorResponse(res, 'error finding admins with model', error)
		}

		if (!admins || admins.length <= 0)
			return SuccessResponse(res, 'admins are empty at the moment', admins)

		return SuccessResponse(res, 'admins found', admins)
	}

	/**
	 * Get One Resource
	 * @param {import("express").Request} req
	 * @param {import("express").Response} res
	 */
	static getOne = async (req, res) => {
		let admin

		try {
			admin = await Admin.findById(req.params.id).select(SELECT_FILTER)
		} catch (error) {
			return ErrorResponse(res, 'error finding admin with model', error)
		}

		if (!admin) return SuccessResponse(res, 'admin not found', admin)

		return SuccessResponse(res, 'admin found', admin)
	}

	/**
	 * Update One Resource
	 * @param {import("express").Request} req
	 * @param {import("express").Response} res
	 */
	static updateOne = async (req, res) => {
		const { email, password } = req.body
		const { id: _id } = req.params

		if (!email && !password)
			return ErrorResponse(res, 'nothing sent to update', null, 200)

		let admin

		try {
			admin = await Admin.findOne({ _id })
		} catch (error) {
			return ErrorResponse(res, 'error while trying to find admin', error)
		}

		if (!admin) return ErrorResponse(res, 'no admins found')

		let updatedAdmin

		try {
			updatedAdmin = await Admin.update({ _id }, req.body)
		} catch (error) {
			return ErrorResponse(res, 'error updating admin', error)
		}

		return SuccessResponse(res, 'admin updated', updatedAdmin)
	}

	/**
	 * Delete One Resource
	 * @param {import("express").Request} req
	 * @param {import("express").Response} res
	 */
	static deleteOne = async (req, res) => {
		let admin

		try {
			admin = await Admin.findByIdAndRemove(req.params.id, {
				returnDocument: true,
			})
		} catch (error) {
			return ErrorResponse(res, 'error deleting with admin model', error)
		}

		if (!admin) return ErrorResponse(res, 'admin not found', null)

		return SuccessResponse(res, 'admin deleted', { deletedAdmin: admin })
	}
}

module.exports = AdminController
