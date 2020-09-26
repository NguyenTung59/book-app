const bcrypt = require('bcryptjs');
const User = require('../models/user.model');

module.exports.index = async (req, res, next) => {
	const users = await User.find();
	res.render('users/index', {
		users: users
	});
}