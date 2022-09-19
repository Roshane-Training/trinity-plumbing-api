const { SuccessResponse, ErrorResponse } = require('../lib/helpers')
const Admin = require('../models/admin')
const bcrypt = require('bcrypt')

// const SELECT_FILTER = '-password -__v'
const SELECT_FILTER = ''
class AdminController {
	/**
	 * Create One Resource
	 * @param {import("express").Request} req
	 * @param {import("express").Response} res
	 */
	static createOne = async (req, res) => {
		try {
			const createdAdmin = await Admin.create(req.body)
			SuccessResponse(res, 'admin created', createdAdmin, 201)
		} catch (error) {
			ErrorResponse(res, 'error creating admin', error)
		}
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
			ErrorResponse(res, 'error finding admins with model', error)
		}

		if (!admins || admins.length <= 0)
			ErrorResponse(res, 'admins are empty at the moment', admins)

		SuccessResponse(res, 'admins found', admins)
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
			ErrorResponse(res, 'error finding admin with model', error)
		}

		if (!admin) SuccessResponse(res, 'admin not found', admin)

		SuccessResponse(res, 'admin found', admin)
	}

	/**
	 * Update One Resource
	 * @param {import("express").Request} req
	 * @param {import("express").Response} res
	 */
	static updateOne = async (req, res) => {
		const { id: _id } = req.params

		if (!req.body) ErrorResponse(res, 'nothing sent to update', null, 200)

		try {
			const admin = await Admin.findOne({ _id })
			if (!admin) ErrorResponse(res, 'no admins found')
		} catch (error) {
			ErrorResponse(res, 'error while trying to find admin', error)
		}

		try {
			req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
			const updateResponse = await Admin.updateOne({ _id }, req.body)
			SuccessResponse(res, 'admin updated', updateResponse)
		} catch (error) {
			ErrorResponse(res, 'error updating admin', error)
		}
	}

	/**
	 * Delete One Resource
	 * @param {import("express").Request} req
	 * @param {import("express").Response} res
	 */
	static deleteOne = async (req, res) => {
		try {
			const admin = await Admin.findByIdAndRemove(req.params.id, {
				Document: true,
			})

			if (!admin) ErrorResponse(res, 'admin not found', null)

			SuccessResponse(res, 'admin deleted', { deletedAdmin: admin })
		} catch (error) {
			ErrorResponse(res, 'error deleting with admin model', error)
		}
	}
}

module.exports = AdminController
