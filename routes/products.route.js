const express = require('express')
const router = express.Router()
const ProductController = require('../controllers/product.controller')
const upload = require('../middlewares/productUpload.middleware')

router
.route('/name/:name')
.get(ProductController.getOneByName)

router
.route('/')
.get(ProductController.getAll)
.post(upload.single('image'),ProductController.createOne)


router
	.route('/:id')
	.get(ProductController.getOne)
	.patch(ProductController.updateOne)
	.delete(ProductController.deleteOne)

module.exports = router
