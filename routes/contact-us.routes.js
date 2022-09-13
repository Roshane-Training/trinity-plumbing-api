const express = require('express')
const router = express.Router()
const ContactUsController = require('../controllers/contact-us.controller')

router.route('/').get(ContactUsController.getAll).post(ContactUsController.createOne)
router
	.route('/:id')
	.get(ContactUsController.getOne)
	.patch(ContactUsController.updateOne)
	.delete(ContactUsController.deleteOne)

module.exports = router
