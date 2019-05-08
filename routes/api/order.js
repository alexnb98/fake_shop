const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

const User = require('../../models/User');

// @route    POST api/user/register
// @desc     Register user
// @access   Public
router.get('/', auth, async (req, res) => {
	try {
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server error');
	}
});
