const express = require('express');
const router = express.Router();

const Product = require('../../models/Product');

// @route    GET api/product/
// @desc     Get all Products
// @access   Public
router.get('/', async (req, res) => {
	try {
		const products = await Product.find();
		if (!products) return res.status(400).json({ msg: 'No products found' });
		res.json(products);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

// @route    GET api/product/:id
// @desc     Get one Product
// @access   Public
router.get('/:id', async (req, res) => {
	try {
		const product = await Product.findOne({ _id: req.params.id });
		if (!product) return res.status(400).json({ msg: 'Product found' });
		res.json(product);
	} catch (err) {
		if (err.kind === 'ObjectId') return res.status(400).json({ msg: 'Product found' });
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

module.exports = router;
