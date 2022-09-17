const express = require('express')
const router = express.Router()
const ProductController = require('../controllers/product.controller')

router.route('/').get(ProductController.getAll).post(ProductController.createOne)

router
	.route('/:id')
	.get(ProductController.getOne)
	.patch(ProductController.updateOne)
	.delete(ProductController.deleteOne)

module.exports = router
