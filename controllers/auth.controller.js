const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const env = require('dotenv');

module.exports.login = (req, res) => {
	res.render('auth/login');
};

module.exports.register = (req, res) => {
	res.render('auth/register');
};

module.exports.postRegister = async (req, res, next) => {
	// LETS VALIDATE THE DATA BEFORE WE A USER
	// try {
	// 	const { error } = await registerValidation(req.body);
	// 	if (error) return res.status(400).send(error.details[0].message);
	// }catch(err) {
	// 	console.log(err);
	// }

	//Checking if the user is already in the database
	const emailExist = await User.findOne({ email: req.body.email });
	if(emailExist) return res.status(400).send('Email already exists');

	//Hash passwords
	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(req.body.password, salt);

	//Create a new user
	const user = new User({
		name: req.body.name,
		email: req.body.email,
		password: hashedPassword
	});

	try{
		const savedUser = await user.save();
		// res.send({user: user._id});
				//Create and assign a token
		const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
		res.cookie('authCookie', token, {
			signed: true
		});
		
		res.redirect('/');

		next();
	}catch(err) {
		res.status(400).send(err);
	}

};

module.exports.postLogin = async (req, res, next) => {
	// LETS VALIDATE THE DATA BEFORE WE A USER
	// try {
	// 	const { error } = await loginValidation(req.body);
	// 	if (error) return res.status(400).send(error.details[0].message);
	// }catch(err) {
	// 	console.log(err);
	// }

	try {

		//Checking if the user is already in the database
		const user = await User.findOne({ email: req.body.email });
		if (!user) return res.status(400).send('Email or password is Wrong');
		//Password is correct
		const validPass = await bcrypt.compare(req.body.password, user.password);
		if (!validPass) return res.status(400).send('Invalid Password');

		//Create and assign a token
		const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
		res.cookie('authCookie', token, {
			signed: true
		});
		// console.log(req.user);
		// try {
		// 	res.cookie('authCookie', process.env.SESSION_SECRET, {
		// 		signed: true
		// 	});
		// }catch(err) {
		// 	res.send(err);
		// }
		// res.header('auth-token', token);

		res.locals.user = token;
		res.redirect('/');

		next();
	}catch(err) {
		res.status(403).send(err);
	}

};

