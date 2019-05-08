const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = (req, res, next) => {
	const token = req.header('x-auth-token');

	if (!token) return res.status(401).json({ msg: 'Not logged in, authorization denied. Please log in' });

	try {
		const decoded = jwt.verify(token, config.get('jwtSecret'));
		if (decoded.user) req.user = decoded.user;
		if (decoded.company) req.company = decoded.company;
		next();
	} catch (err) {
		res.status(401).json({ msg: 'Session not valid, please sign in again' });
	}
};
