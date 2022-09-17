const express = require('express')
const router = express.Router()
const RequestController = require('../controllers/request.controller.js')

router.route('/').get(RequestController.getAll).post(RequestController.createOne)

router
	.route('/:id')
	.get(RequestController.getOne)
	.patch(RequestController.updateOne)
	.delete(RequestController.deleteOne)

module.exports = router
