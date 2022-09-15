const express = require('express')
const router = express.Router()
const AdminController = require('../controllers/admin.controller')

router.route('/').get(AdminController.getAll).post(AdminController.createOne)
router
	.route('/:id')
	.get(AdminController.getOne)
	.patch(AdminController.updateOne)
	.delete(AdminController.deleteOne)

module.exports = router
