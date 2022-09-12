class IndexController {
	static welcome = (req, res) => {
		res.status(200).json({
			message: 'Hello, World!',
			version: 'v1.0',
		})
	}

	static fun = (req, res) => {
		res.status(419).json({
			message:
				'You seem to have a lot of free time, would you like to help develop trinity-plumbing-api!',
			version: 'v1.0',
		})
	}
}

module.exports = IndexController
