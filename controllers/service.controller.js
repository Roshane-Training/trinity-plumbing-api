const { SuccessResponse, ErrorResponse } = require('../lib/helpers')
const Service = require('../models/service')

class ServiceController {

     /**
     * Create One Service Resource
     * @param {import("express").Request} req
	 * @param {import("express").Response} res
     */
      static createOne = async (req, res) => {
        const createdService = await Service.create(req.body).catch((error) => {
            ErrorResponse(res, 'error creating service', error, 500)
        })

        SuccessResponse(res, 'service created', createdService, 201)
    }


    /**
     * Get All Service Resources
     * @param {import("express").Request} req
	 * @param {import("express").Response} res
     */
     static getAll = async (req, res) => {
        const services = await Service.find().catch((error) => {
            return ErrorResponse(res, 'error finding services', error, 500)
        })

        if (!services || services.lenght <= 0)
            return SuccessResponse(res, 'there are no services at the moment', services)

        return SuccessResponse(res, 'services found', services)
    }


    /**
     * Get One Service Resource
     * @param {import("express").Request} req
	 * @param {import("express").Response} res
     */
     static getOne = async (req, res) => {
        const service = await Service.findById(req.params.id).catch((error) => {
            return ErrorResponse(res, 'error finding the service', error, 500)
        })

        if (!product) return SuccessResponse(res, 'service not found', service)

        return SuccessResponse(res, 'service found', service)
    }


    /**
     * Update One Service Resource
    *  @param {import("express").Request} req
	 * @param {import("express").Response} res
     */
     static updateOne = async (req, res) => {
        const { image, title, description, price } = req.body
        const { id: _id } = req.params

        if (!image && !title && !description && !price)
            return ErrorResponse(res, 'no data sent for an update', null, 200)

        const service = await Service.findOne({ _id }).catch((error) => {
            return ErrorResponse(res, 'error while trying to find service', error, 500)
        })

        if (!service) return ErrorResponse(res, 'no service found')

        const updatedService = await Service.updateOne(
            { _id },
            { image, title, description, price },
            { returnDocument: true, returnOriginal: true, new: true }
        ).catch((error) => {
            return ErrorResponse(res, 'error updating service', error, 500)
        })

        SuccessResponse(res, 'service updated', updatedService)
    }


    /**
     * Delete One Service Resource
     * @param {import("express").Request} req
	 * @param {import("express").Response} res
     */
    static deleteOne = async (req, res) => {
        let service = await Service.findByIdAndRemove(req.params.id, {
            returnDocument: true,
        }).catch((error) => {
            ErrorResponse(res, 'error deleting service', error, 500)
        })

        if(!service) return ErrorResponse(res, 'service not found for deletion', null, 200)

        return SuccessResponse(res, 'service deleted', service.title)
    }

}

module.exports = ServiceController
