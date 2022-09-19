const { SuccessResponse, ErrorResponse } = require('../lib/helpers')
const Request = require('../models/request.js')

class RequestController {
	/**
	 * Create One Request Resource
	 * @param {import("express").Request} req
	 * @param {import("express").Response} res
	 */
	static createOne = async (req, res) => {
		try {
			const createdRequest = await Request.create(req.body)
			SuccessResponse(res, 'request created', createdRequest, 201)
		} catch (err) {
			ErrorResponse(res, 'error creating request', err, 500)
		}
	}

	/**
	 * Get All Request Resources
	 * @param {import("express").Request} req
	 * @param {import("express").Response} res
	 */
	static getAll = async (req, res) => {
		try {
			const requests = await Request.find()
			if (!requests || requests.length <= 0)
				SuccessResponse(res, 'there are no requests at the moment', requests)

			SuccessResponse(res, 'requests found', requests)
		} catch (error) {
			ErrorResponse(res, 'error finding requests', error, 500)
		}
	}

	/**
	 * Get One Request Resource
	 * @param {import("express").Request} req
	 * @param {import("express").Response} res
	 */
	static getOne = async (req, res) => {
		try {
			const request = await Request.findById(req.params.id)
			if (!product) SuccessResponse(res, 'request not found', request)

			SuccessResponse(res, 'request found', request)
		} catch (error) {
			ErrorResponse(res, 'error finding the request', error, 500)
		}
	}

	/**
	 * Update One Request Resource
	 * @param {import("express").Request} req
	 * @param {import("express").Response} res
	 */
	static updateOne = async (req, res) => {
		const { id: _id } = req.params

		if (!req.body) ErrorResponse(res, 'no data sent for an update', null, 200)

		try {
			const request = await Request.findOne({ _id })

			if (!request) ErrorResponse(res, 'no request found')
			try {
				const updatedRequest = await Request.updateOne({ _id }, req.body, {
					returnDocument: true,
					returnOriginal: true,
					new: true,
				})

				SuccessResponse(res, 'request updated', updatedRequest)
			} catch (error) {
				ErrorResponse(res, 'error updating request', error, 500)
			}
		} catch (error) {
			ErrorResponse(res, 'error while trying to find request', error, 500)
		}
	}

	/**
	 * Delete One Request Resource
	 * @param {import("express").Request} req
	 * @param {import("express").Response} res
	 */
	static deleteOne = async (req, res) => {
		try {
			const request = await Request.findByIdAndRemove(req.params.id, {
				returnDocument: true,
			})

			if (!request)
				return ErrorResponse(res, 'request not found for deletion', null, 200)

			SuccessResponse(res, 'request deleted', { deletedRequest: request })
		} catch (error) {
			ErrorResponse(res, 'error deleting request', error, 500)
		}
	}
}

module.exports = RequestController
