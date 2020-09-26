//VALIDATION
const Joi = require('@hapi/joi');
const User = require('../models/user.model');

module.exports.loginValidation = function (req, res, next) {
	var errors = [];
	if (!req.body.email) {
		errors.push('Email is required.');
	}

	if (!req.body.password) {
		errors.push('Password is required.');
	}

	if (errors.length) {
		res.render('auth/login', {
			errors: errors,
			values: req.body
		});
		return;
	}

	res.locals.success = true;

	next();
}


// module.exports.registerValidation = async (data) => {
// 	const schema = await Joi.object({
// 		name: Joi.string().min(6).required(),
// 		email: Joi.string().min(6).required().email(),
// 		password: Joi.string().min(6).required()
// 	});
// 	return schema.validate(data, schema);
// }

// module.exports.loginValidation = async (data) => {
// 	const schema = await Joi.object({
// 		email: Joi.string().min(6).required().email(),
// 		password: Joi.string().min(6).required()
// 	});
// 	console.log(schema);
// 	return schema.validate(data, schema);
// }