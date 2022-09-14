const express = require('express')
const router = express.Router()
const ServiceController = require('../controllers/service.controller')

router
    .route('/')
    .get(ServiceController.getAll)
    .post(ServiceController.createOne)

router
	.route('/:id')
	.get(ServiceController.getOne)
	.patch(ServiceController.updateOne)
	.delete(ServiceController.deleteOne)

module.exports = router