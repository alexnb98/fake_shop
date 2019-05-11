const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator/check');
const auth = require('../../middleware/auth');

const Company = require('../../models/Company');
const Product = require('../../models/Product');

// @route    GET api/company/products
// @desc     Get all companies products
// @access   Private
router.get('/products', auth, async (req, res) => {
	try {
		const products = await Product.find({ companyRef: req.company.id });
		if (!products) return res.status(400).json({ msg: 'No products found' });
		res.json(products);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

// @route    POST api/company/register
// @desc     Register company
// @access   Public
router.post(
	'/register',
	[
		check('name', 'Please insert Company Name').not().isEmpty(),
		check('email', 'Please include a valid emial').isEmail(),
		check('password', 'Please include a password with more than 6 charachters').isLength({ min: 6 })
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
		const { name, email, password } = req.body;
		try {
			let company = await Company.findOne({ email });
			if (company) return res.status(400).json({ msg: 'Company already exists' });
			company = new Company({ name, email, password });
			const salt = await bcrypt.genSalt(10);
			company.password = await bcrypt.hash(password, salt);
			await company.save();
			// generate token
			const payload = { company: { id: company.id } };
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

// @route    POST api/company/login
// @desc     Login company
// @access   Public
router.post(
	'/login',
	[ check('email', 'Please include a valid email').isEmail(), check('password', 'Password is required').exists() ],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
		const { email, password } = req.body;
		try {
			const company = await Company.findOne({ email });
			if (!company) return res.status(400).json({ msg: 'Invalid Credentials' });
			const isMatch = await bcrypt.compare(password, company.password);
			if (!isMatch) return res.status(400).json({ msg: 'Invalid Credentials' });
			const payload = { company: { id: company.id } };

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

// @route    POST api/company/create
// @desc     Create Product
// @access   Privat/Company
router.post(
	'/create',
	[
		auth,
		[
			check('title', 'Title is required').not().isEmpty(),
			check('price', 'Please set numeric value for the price').isNumeric(),
			check('imageUrl', 'Please include an image URL').not().isEmpty()
		]
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
		if (!req.company) return res.status(400).json({ msg: 'Please log in as a company' });
		try {
			const { title, price, description, imageUrl } = req.body;
			const product = new Product({ title, price, description, imageUrl, companyRef: req.company.id });
			await product.save();
			res.json(product);
		} catch (err) {
			console.error(err.message);
			res.status(500).send('Server Error');
		}
	}
);

// @route    PUT api/company/:id
// @desc     Update Product
// @access   Privat/Company
router.put(
	'/:id',
	[
		auth,
		[
			check('title', 'Title is required').not().isEmpty(),
			check('price', 'Please set numeric value for the price').isNumeric(),
			check('imageUrl', 'Please include an image URL').not().isEmpty()
		]
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
		if (!req.company) return res.status(400).json({ msg: 'Please log in as a company' });
		try {
			const { title, price, description, imageUrl } = req.body;
			const product = await Product.findOne({ _id: req.params.id });
			if (!product) return res.status(401).json({ msg: 'Product not found' });
			if (product.companyRef.toString() !== req.company.id) {
				return res.status(400).json({ msg: 'Not authorized' });
			}
			product.title = title;
			product.price = price;
			product.description = description;
			product.imageUrl = imageUrl;
			await product.save();
			res.json(product);
		} catch (err) {
			console.error(err.message);
			res.status(500).send('Server Error');
		}
	}
);

// @route    DELETE api/company/:id
// @desc     Delete Product
// @access   Privat/Company
router.delete('/:id', auth, async (req, res) => {
	if (!req.company) return res.status(400).json({ msg: 'Please log in as a company' });
	try {
		const product = await Product.findOne({ _id: req.params.id });
		if (!product) return res.status(401).json({ msg: 'Product not found' });
		if (product.companyRef.toString() !== req.company.id) {
			return res.status(400).json({ msg: 'Not authorized' });
		}
		await product.remove((err) => {
			if (err) return res.status(401).json({ msg: err });
		});
		res.json({ msg: 'Product Deleted' });
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

module.exports = router;
