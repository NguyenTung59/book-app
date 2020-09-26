const jwt = require('jsonwebtoken');
const evn = require('dotenv');

module.exports = function(req, res, next) {
	const token = req.signedCookies.authCookie;
	if(!token) return res.status(401).send('Access Sora');

	try{
		const verified = jwt.verify(token, process.env.TOKEN_SECRET);
		req.user = verified;
	}catch(err) {
		res.status(400).send('Invaild Token');
	}
	next();
}