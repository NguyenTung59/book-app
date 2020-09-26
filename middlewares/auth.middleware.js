var User = require('../models/user.model');

module.exports.requireAuth = async (req, res, next) => {
	// console.log(req.cookies, req.signedCookies);
	// console.log(req.header);
	if (!req.signedCookies.authCookie) {
		res.redirect('/auth/login');
		return;
	}

	var user = await User.find();

	if (!user) {
		res.redirect('/auth/login');
		return;
	}

	res.locals.user = user;

	next();
};
