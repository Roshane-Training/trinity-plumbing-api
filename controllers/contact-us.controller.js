const { SuccessResponse, ErrorResponse } = require('../lib/helpers')
const ContactUs = require('../models/contact-us')

class ContactUsController {
	/**
	 * Create One Resource
	 * @param {import("express").Request} req
	 * @param {import("express").Response} res
	 */
	static createOne = async (req, res) => {
		let document

		try {
			document = await ContactUs.create(req.body)
		} catch (error) {
			return ErrorResponse(res, 'error creating contact-us', error)
		}

		return SuccessResponse(res, 'contact-us created', document, 201)
	}

	/**
	 * Get All Resources
	 * @param {import("express").Request} req
	 * @param {import("express").Response} res
	 */
	static getAll = async (req, res) => {
		let documents

		try {
			documents = await ContactUs.find()
		} catch (error) {
			return ErrorResponse(res, 'error finding contact-us with model', error)
		}

		if (!documents || documents.length <= 0)
			return SuccessResponse(res, 'contact-us are empty at the moment', documents)

		return SuccessResponse(res, 'contact-us found', documents)
	}

	/**
	 * Get One Resource
	 * @param {import("express").Request} req
	 * @param {import("express").Response} res
	 */
	static getOne = async (req, res) => {
		let document

		try {
			document = await ContactUs.findById(req.params.id)
		} catch (error) {
			return ErrorResponse(res, 'error finding contact-us with model', error)
		}

		if (!document) return SuccessResponse(res, 'contact-us not found', document)

		return SuccessResponse(res, 'contact-us found', document)
	}

	/**
	 * Update One Resource
	 * @param {import("express").Request} req
	 * @param {import("express").Response} res
	 */
	static updateOne = async (req, res) => {
		const { id: _id } = req.params
		let document
		let updatedUser

		if (!req.body) return ErrorResponse(res, 'nothing sent to update', null, 200)

		try {
			document = await ContactUs.findOne({ _id })
		} catch (error) {
			return ErrorResponse(res, 'error while trying to find contact-us', error)
		}

		if (!document) return ErrorResponse(res, `no contact-us found`)

		try {
			updatedUser = await ContactUs.updateOne(
				{ _id },
				{ ...req.body },
				{ returnDocument: true, returnOriginal: true, new: true }
			)
		} catch (error) {
			return ErrorResponse(res, 'error updating contact-us', error)
		}

		return SuccessResponse(res, 'contact-us updated', updatedUser)
	}

	/**
	 * Delete One Resource
	 * @param {import("express").Request} req
	 * @param {import("express").Response} res
	 */
	static deleteOne = async (req, res) => {
		let document

		try {
			document = await ContactUs.findByIdAndRemove(req.params.id, {
				returnDocument: true,
			})
		} catch (error) {
			return ErrorResponse(res, 'error deleting with contact-us model', error)
		}

		if (!document) return ErrorResponse(res, 'contact-us not found', null)

		document = document.toObject()
		delete document.__v
		delete document._id

		return SuccessResponse(res, 'contact-us deleted', { deletedDocument: document })
	}
}

module.exports = ContactUsController
