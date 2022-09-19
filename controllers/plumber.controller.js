const { SuccessResponse, ErrorResponse } = require('../lib/helpers')
const Plumber = require('../models/plumber')

class PlumberController {
	/**
	 * Create One Plumber Resource
	 * @param {import("express").Request} req
	 * @param {import("express").Response} res
	 */
	static createOne = async (req, res) => {
		try {
			const createdPlumber = await Plumber.create(req.body)
			SuccessResponse(res, 'plumber created', createdPlumber, 201)
		} catch (error) {
			ErrorResponse(res, 'error creating plumber', error, 500)
		}
	}

	/**
	 * Get All Plumber Resources
	 * @param {import("express").Request} req
	 * @param {import("express").Response} res
	 */
	static getAll = async (req, res) => {
		const plumbers = await Plumber.find().catch((error) => {
			return ErrorResponse(res, 'error finding plumbers', error, 500)
		})

		if (!plumbers || plumbers.length <= 0)
			return SuccessResponse(res, 'there are no plumbers at the moment', plumbers)

		return SuccessResponse(res, 'plumbers found', plumbers)
	}

	/**
	 * Get One Plumber Resource
	 * @param {import("express").Request} req
	 * @param {import("express").Response} res
	 */
	static getOne = async (req, res) => {
		const plumber = await Plumber.findById(req.params.id).catch((error) => {
			return ErrorResponse(res, 'error finding the plumber', error, 500)
		})

		if (!plumber) return SuccessResponse(res, 'plumber not found', plumber)

		return SuccessResponse(res, 'plumber found', plumber)
	}

	/**
	 * Update One Plumber Resource
	 *  @param {import("express").Request} req
	 * @param {import("express").Response} res
	 */
	static updateOne = async (req, res) => {
		const { name, image, email, tel_number, customer_rating } = req.body
		const { id: _id } = req.params

		if (!name && !image && !email && !tel_number && !customer_rating)
			return ErrorResponse(res, 'no data sent for an update', null, 200)

		const plumber = await Plumber.findOne({ _id }).catch((error) => {
			return ErrorResponse(res, 'error while trying to find plumber', error, 500)
		})

		if (!plumber) return ErrorResponse(res, 'no plumber found')

		const updatedPlumber = await Plumber.updateOne(
			{ _id },
			{ name, image, email, tel_number, customer_rating },
			{ returnDocument: true, returnOriginal: true, new: true }
		).catch((error) => {
			return ErrorResponse(res, 'error updating plumber', error, 500)
		})

		SuccessResponse(res, 'plumber updated', updatedPlumber)
	}

	/**
	 * Delete One Plumber Resource
	 * @param {import("express").Request} req
	 * @param {import("express").Response} res
	 */
	static deleteOne = async (req, res) => {
		let plumber = await Plumber.findByIdAndRemove(req.params.id, {
			returnDocument: true,
		}).catch((error) => {
			ErrorResponse(res, 'error deleting plumber', error, 500)
		})

		if (!plumber) return ErrorResponse(res, 'plumber not found for deletion', null, 200)

		return SuccessResponse(res, 'plumber deleted', plumber.name)
	}
}

module.exports = PlumberController
