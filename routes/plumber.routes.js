const express = require('express')
const router = express.Router()
const PlumberController = require('../controllers/plumber.controller')

router
    .route('/')
    .get(PlumberController.getAll)
    .post(PlumberController.createOne)

router
	.route('/:id')
	.get(PlumberController.getOne)
	.patch(PlumberController.updateOne)
	.delete(PlumberController.deleteOne)

module.exports = router