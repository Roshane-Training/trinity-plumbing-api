const { SuccessResponse, ErrorResponse } = require('../lib/helpers')
const Service = require('../models/service')

class ServiceController {
	/**
	 * Create One Service Resource
	 * @param {import("express").Request} req
	 * @param {import("express").Response} res
	 */
	static createOne = async (req, res) => {
		try {
			const createdService = await Service.create(req.body)
			SuccessResponse(res, 'service created', createdService, 201)
		} catch (error) {
			ErrorResponse(res, 'error creating service', error, 500)
		}
	}

	/**
	 * Get All Service Resources
	 * @param {import("express").Request} req
	 * @param {import("express").Response} res
	 */
	static getAll = async (req, res) => {
		try {
			const services = await Service.find()
			if (!services || services.lenght <= 0)
				SuccessResponse(res, 'there are no services at the moment', services)

			SuccessResponse(res, 'services found', services)
		} catch (error) {
			ErrorResponse(res, 'error finding services', error, 500)
		}
	}

	/**
	 * Get One Service Resource
	 * @param {import("express").Request} req
	 * @param {import("express").Response} res
	 */
	static getOne = async (req, res) => {
		try {
			const service = await Service.findById(req.params.id)
			if (!product) SuccessResponse(res, 'service not found', service)

			SuccessResponse(res, 'service found', service)
		} catch (error) {
			ErrorResponse(res, 'error finding the service', error, 500)
		}
	}

	/**
	 * Update One Service Resource
	 *  @param {import("express").Request} req
	 * @param {import("express").Response} res
	 */
	static updateOne = async (req, res) => {
		const { id: _id } = req.params

		if (!req.body) ErrorResponse(res, 'no data sent for an update', null, 200)

		try {
			const service = await Service.findOne({ _id })

			if (!service) ErrorResponse(res, 'no service found')
			try {
				const updatedService = await Service.updateOne({ _id }, req.body, {
					returnDocument: true,
					returnOriginal: true,
					new: true,
				})

				SuccessResponse(res, 'service updated', updatedService)
			} catch (error) {
				ErrorResponse(res, 'error updating service', error, 500)
			}
		} catch (error) {
			ErrorResponse(res, 'error while trying to find service', error, 500)
		}
	}

	/**
	 * Delete One Service Resource
	 * @param {import("express").Request} req
	 * @param {import("express").Response} res
	 */
	static deleteOne = async (req, res) => {
		try {
			const service = await Service.findByIdAndRemove(req.params.id, {
				returnDocument: true,
			})

			if (!service)
				return ErrorResponse(res, 'service not found for deletion', null, 200)

			SuccessResponse(res, 'service deleted', { deletedService: service })
		} catch (error) {
			ErrorResponse(res, 'error deleting service', error, 500)
		}
	}
}

module.exports = ServiceController
