const { SuccessResponse, ErrorResponse } = require('../lib/helpers')
const Issue = require('../models/issue')

class IssueController {
	/**
	 * Create One Resource
	 * @param {import("express").Request} req
	 * @param {import("express").Response} res
	 */
	static createOne = async (req, res) => {
		try {
			const createdIssue = await Issue.create(req.body)
			return SuccessResponse(res, 'issue created', createdIssue, 201)
		} catch (error) {
			return ErrorResponse(res, 'error creating issue', error)
		}
	}

	/**
	 * Get All Resources
	 * @param {import("express").Request} req
	 * @param {import("express").Response} res
	 */
	static getAll = async (req, res) => {
		try {
			const issues = await Issue.find()
			if (!issues || issues.length <= 0)
				return SuccessResponse(res, 'issues are empty at the moment', issues)

			return SuccessResponse(res, 'issues found', issues)
		} catch (error) {
			return ErrorResponse(res, 'error finding issues with model', error)
		}
	}

	/**
	 * Get One Resource
	 * @param {import("express").Request} req
	 * @param {import("express").Response} res
	 */
	static getOne = async (req, res) => {
		try {
			const issue = await Issue.findById(req.params.id)
			if (!issue) return SuccessResponse(res, 'issue not found', issue)

			return SuccessResponse(res, 'issue found', issue)
		} catch (error) {
			return ErrorResponse(res, 'error finding issue with model', error)
		}
	}

	/**
	 * Update One Resource
	 * @param {import("express").Request} req
	 * @param {import("express").Response} res
	 */
	static updateOne = async (req, res) => {
		const { id: _id } = req.params

		if (!req.body) return ErrorResponse(res, 'nothing sent to update', null, 200)

		try {
			const issue = await Issue.findOne({ _id })
			if (!issue) return ErrorResponse(res, 'no issues found')

			let updatedIssue

			try {
				updatedIssue = await Issue.updateOne({ _id }, req.body)
			} catch (error) {
				return ErrorResponse(res, 'error updating issue', error)
			}

			return SuccessResponse(res, 'issue updated', updatedIssue)
		} catch (error) {
			return ErrorResponse(res, 'error while trying to find issue', error)
		}
	}

	/**
	 * Delete One Resource
	 * @param {import("express").Request} req
	 * @param {import("express").Response} res
	 */
	static deleteOne = async (req, res) => {
		try {
			const issue = await Issue.findByIdAndRemove(req.params.id, {
				returnDocument: true,
			})
			if (!issue) return ErrorResponse(res, 'issue not found', null)

			return SuccessResponse(res, 'issue deleted', { deletedIssue: issue })
		} catch (error) {
			return ErrorResponse(res, 'error deleting with issue model', error)
		}
	}
}

module.exports = IssueController
