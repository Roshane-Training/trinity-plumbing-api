const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

const { generateAccessToken, ErrorResponse, SuccessResponse } = require('../lib/helpers')

class AuthController {
	/**
	 *
	 * @param {import("express").Request} req
	 * @param {import("express").Response} res
	 */
	static login = async (req, res) => {
		let { email, password } = req.body
		let existingUser
		let token

		const unknownError = 'error! something went wrong on our end.'

		existingUser = await User.findOne({ email: email }).catch((error) => {
			return ErrorResponse(res, unknownError, error)
		})

		if (!existingUser) {
			return ErrorResponse(res, "we couldn't find your account", null, 404)
		}

		const isValidLogin = bcrypt.compareSync(password, existingUser.password)

		if (isValidLogin === false) {
			return ErrorResponse(res, 'invalid credentials', null)
		} else {
			token = generateAccessToken({
				_id: existingUser.id,
			})

			//remove password before returning the response
			const _existingUser = existingUser.toObject()
			delete _existingUser.password

			return SuccessResponse(res, 'login successful', {
				token,
				user: _existingUser,
			})
		}
	}

	/**
	 * Get Authenticated User
	 * @param {request} req
	 * @param {response} res
	 */
	static getAuthUser = async (req, res) => {
		// this function requires the auth middleware
		const { _id } = req.user //deconstruct authenticated user's id

		try {
			const authUser = await User.findById(_id).select('_id email role')
			return SuccessResponse(res, undefined, authUser)
		} catch (error) {
			return ErrorResponse(res, 'error finding auth user', error, 404)
		}
	}

	/**
	 * Get Token Info
	 * @param {request} req
	 * @param {response} res
	 */
	static decodeToken = async (req, res) => {
		// Get token from auth header
		const token = req.headers.authorization && req.headers.authorization.split(' ')[1]

		// token not found
		if (!token) return ErrorResponse(res, 'token not found', null, 404)

		const decodedToken = jwt.decode(token, { complete: true, json: true })

		if (decodedToken == null)
			return ErrorResponse(res, 'this token might be invalid', null, 500)

		return SuccessResponse(res, 'token decoded', decodedToken.payload)
	}
}

module.exports = AuthController
