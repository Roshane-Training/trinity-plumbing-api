const express = require('express')
const router = express.Router()
const IssueController = require('../controllers/issue.controller')

router.route('/').get(IssueController.getAll).post(IssueController.createOne)
router
	.route('/:id')
	.get(IssueController.getOne)
	.patch(IssueController.updateOne)
	.delete(IssueController.deleteOne)

module.exports = router
