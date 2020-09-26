var mongoose = require('mongoose');

var authSchema = new mongoose.Schema({
	email: String
});

var Auth = mongoose.model('Auth', authSchema, 'auth');

module.exports = Auth;