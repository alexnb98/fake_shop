const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator/check');
const auth = require('../../middleware/auth');

const User = require('../../models/User');
const Product = require('../../models/Product');
const Order = require('../../models/Order');

// @route    POST api/user/register
// @desc     Register user
// @access   Public
router.post(
	'/register',
	[
		check('name', 'Name is required').not().isEmpty(),
		check('email', 'Email is required').not().isEmpty(),
		check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 })
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
		const { name, email, password } = req.body;
		try {
			// check if user exists
			let user = await User.findOne({ email });
			if (user) return res.status(400).json({ msg: 'User already exists' });
			// create new user
			user = new User({ name, email, password });
			// encrypt password
			const salt = await bcrypt.genSalt(10);
			user.password = await bcrypt.hash(password, salt);
			// save user to db
			await user.save();
			// generate jwt
			const payload = { user: { id: user.id } };
			jwt.sign(payload, config.get('jwtSecret'), { expiresIn: 3600 }, (err, token) => {
				if (err) throw err;
				res.json(token);
			});
		} catch (err) {
			console.error(err.message);
			res.status(500).send('Server error');
		}
	}
);

// @route    POST api/user/login
// @desc     Login user
// @access   Public
router.post(
	'/login',
	[
		check('email', 'Please include a valid email').isEmail(),
		check('password', 'Password is required').not().isEmpty()
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
		const { email, password } = req.body;
		try {
			const user = await User.findOne({ email });
			if (!user) return res.status(400).json({ msg: 'Invalid Credentials' });
			const isMatch = await bcrypt.compare(password, user.password);
			if (!isMatch) return res.status(400).json({ msg: 'Invalid Credentials' });
			const payload = { user: { id: user.id } };

			jwt.sign(payload, config.get('jwtSecret'), { expiresIn: 3600 }, (err, token) => {
				if (err) throw err;
				res.json(token);
			});
		} catch (err) {
			console.error(err.message);
			res.status(500).send('Server error');
		}
	}
);

// @route    GET api/user/cart
// @desc     Get user cart
// @access   Private/User
router.get('/cart', auth, async (req, res) => {
	if (!req.user) res.status(400).json({ msg: 'Please login as user' });
	try {
		const user = await User.findById(req.user.id);
		res.json(user.cart);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server error');
	}
});

// @route    POST api/user/cart
// @desc     Add and update product to cart
// @access   Private/User
router.post('/cart', auth, async (req, res) => {
	if (!req.user) res.status(400).json({ msg: 'Please login as user' });
	try {
		const user = await User.findById(req.user.id).select('-password');
		const { productId, quantity } = req.body;
		// check if product exists
		const product = await Product.findById(productId);
		if (!product) return res.status(400).json({ msg: 'Product not found' });
		const newProduct = { product: { ...product }, quantity: quantity };
		// check if product is in cart
		const productIndex = user.cart.map((p) => p.product._id.toString()).indexOf(productId);
		if (productIndex !== -1) {
			user.cart[productIndex] = newProduct;
		} else {
			user.cart.unshift(newProduct);
		}
		//add product to cart
		await user.save();
		res.json(user.cart);
	} catch (err) {
		if (err.kind === 'ObjectId') return res.status(400).json({ msg: 'Product not found' });
		console.error(err.message);
		res.status(500).send('Server error');
	}
});

const deleteCart = async (req, res) => {
	try {
		const user = await User.findById(req.user.id);
		user.cart = [];
		await user.save();
		res.json(user.cart);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server error');
	}
};

// @route    DELETE api/user/cart
// @desc     Remove everything from cart
// @access   Private/User
router.delete('/cart', auth, async (req, res) => {
	if (!req.user) res.status(400).json({ msg: 'Please login as user' });
	deleteCart(req, res);
});

// @route    DELETE api/user/cart/:id
// @desc     Remove one product from cart
// @access   Private/User
router.delete('/cart/:id', auth, async (req, res) => {
	if (!req.user) res.status(400).json({ msg: 'Please login as user' });
	try {
		const user = await User.findById(req.user.id);
		const newCart = user.cart.filter((p) => {
			return p.product._id.toString() !== req.params.id;
		});
		user.cart = newCart;
		await user.save();
		res.json(user.cart);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server error');
	}
});

// @route    POST api/user/order
// @desc     Order Cart
// @access   Private/User
router.post('/order', [ auth, [ check('userAddress', 'Please add an Address').not().isEmpty() ] ], async (req, res) => {
	errors = validationResult(req);
	if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
	if (!req.user) return res.status(400).json({ msg: 'Please login as user' });
	try {
		const user = await User.findById(req.user.id).select('-password');
		if (user.cart.length === 0) return res.status(400).json({ msg: 'No items in Cart' });
		const order = new Order({
			userName: user.name,
			userEmail: user.email,
			userId: req.user.id,
			userAddress: req.body.userAddress,
			cart: user.cart
		});
		await order.save();
		deleteCart(req, res);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server error');
	}
});

module.exports = router;
