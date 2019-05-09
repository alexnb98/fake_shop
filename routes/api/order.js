const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

const Order = require('../../models/Order');

// @route    GET api/order/
// @desc     Get all users orders
// @access   Privat/User
router.get('/', auth, async (req, res) => {
	if (!req.user) res.status(400).json({ msg: 'Please login as user' });
	try {
		const orders = await Order.find({ userId: req.user.id });
		res.json(orders);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server error');
	}
});

module.exports = router;
