const { SuccessResponse, ErrorResponse } = require('../lib/helpers')
const Product = require('../models/product')

class ProductController {
	/**
	 * Create One Product Resource
	 * @param {import("express").Request} req
	 * @param {import("express").Response} res
	 */
	static createOne = async (req, res) => {
		const createdProduct = await Product.create(req.body).catch((error) => {
			ErrorResponse(res, 'error creating product', error, 500)
		})

		SuccessResponse(res, 'product created', createdProduct, 201)
	}

	/**
	 * Get All Product Resources
	 * @param {import("express").Request} req
	 * @param {import("express").Response} res
	 */
	static getAll = async (req, res) => {
		const products = await Product.find().catch((error) => {
			return ErrorResponse(res, 'error finding products', error, 500)
		})

		if (!products || products.length <= 0)
			return SuccessResponse(res, 'there are no products at the moment', products)

		return SuccessResponse(res, 'products found', products)
	}

	/**
	 * Get One Product Resource
	 * @param {import("express").Request} req
	 * @param {import("express").Response} res
	 */
	static getOne = async (req, res) => {
		const product = await Product.findById(req.params.id).catch((error) => {
			return ErrorResponse(res, 'error finding the product with model', error, 500)
		})

		if (!product) return SuccessResponse(res, 'product not found', product)

		return SuccessResponse(res, 'product found', product)
	}

	/**
	 * Update One Product Resource
	 *  @param {import("express").Request} req
	 * @param {import("express").Response} res
	 */
	static updateOne = async (req, res) => {
		const { image, name, description, rating, price } = req.body
		const { id: _id } = req.params

		if (!image && !name && !description && !rating && !price)
			return ErrorResponse(res, 'no data sent for an update', null, 200)

		const product = await Product.findOne({ _id }).catch((error) => {
			return ErrorResponse(res, 'error while trying to find product', error, 500)
		})

		if (!product) return ErrorResponse(res, 'no product found')

		const updatedProduct = await Product.updateOne(
			{ _id },
			{ image, name, description, rating, price },
			{ returnDocument: true, returnOriginal: true, new: true }
		).catch((error) => {
			return ErrorResponse(res, 'error updating product', error, 500)
		})

		SuccessResponse(res, 'product updated', updatedProduct)
	}

	/**
	 * Delete One Product Resource
	 * @param {import("express").Request} req
	 * @param {import("express").Response} res
	 */
	static deleteOne = async (req, res) => {
		let product = await Product.findByIdAndRemove(req.params.id, {
			returnDocument: true,
		}).catch((error) => {
			ErrorResponse(res, 'error deleting product', error, 500)
		})

		if (!product) return ErrorResponse(res, 'product not found for deletion', null, 200)

		return SuccessResponse(res, 'product deleted', product.name)
	}
}

module.exports = ProductController
