const { SuccessResponse, ErrorResponse } = require('../lib/helpers')
const Issue = require('../models/issue')

class IssueController {
	/**
	 * Create One Resource
	 * @param {import("express").Request} req
	 * @param {import("express").Response} res
	 */
	static createOne = async (req, res) => {
		let createdIssue

		try {
			createdIssue = await Issue.create(req.body)
		} catch (error) {
			return ErrorResponse(res, 'error creating issue', error)
		}

		return SuccessResponse(res, 'issue created', createdIssue, 201)
	}

	/**
	 * Get All Resources
	 * @param {import("express").Request} req
	 * @param {import("express").Response} res
	 */
	static getAll = async (req, res) => {
		let issues

		try {
			issues = await Issue.find()
		} catch (error) {
			return ErrorResponse(res, 'error finding issues with model', error)
		}

		if (!issues || issues.length <= 0)
			return SuccessResponse(res, 'issues are empty at the moment', issues)

		return SuccessResponse(res, 'issues found', issues)
	}

	/**
	 * Get One Resource
	 * @param {import("express").Request} req
	 * @param {import("express").Response} res
	 */
	static getOne = async (req, res) => {
		let issue

		try {
			issue = await Issue.findById(req.params.id)
		} catch (error) {
			return ErrorResponse(res, 'error finding issue with model', error)
		}

		if (!issue) return SuccessResponse(res, 'issue not found', issue)

		return SuccessResponse(res, 'issue found', issue)
	}

	/**
	 * Update One Resource
	 * @param {import("express").Request} req
	 * @param {import("express").Response} res
	 */
	static updateOne = async (req, res) => {
		const { id: _id } = req.params

		if (!req.body) return ErrorResponse(res, 'nothing sent to update', null, 200)

		let issue

		try {
			issue = await Issue.findOne({ _id })
		} catch (error) {
			return ErrorResponse(res, 'error while trying to find issue', error)
		}

		if (!issue) return ErrorResponse(res, 'no issues found')

		let updatedIssue

		try {
			updatedIssue = await Issue.updateOne({ _id }, req.body)
		} catch (error) {
			return ErrorResponse(res, 'error updating issue', error)
		}

		return SuccessResponse(res, 'issue updated', updatedIssue)
	}

	/**
	 * Delete One Resource
	 * @param {import("express").Request} req
	 * @param {import("express").Response} res
	 */
	static deleteOne = async (req, res) => {
		let issue

		try {
			issue = await Issue.findByIdAndRemove(req.params.id, {
				returnDocument: true,
			})
		} catch (error) {
			return ErrorResponse(res, 'error deleting with issue model', error)
		}

		if (!issue) return ErrorResponse(res, 'issue not found', null)

		return SuccessResponse(res, 'issue deleted', { deletedIssue: issue })
	}
}

module.exports = IssueController
