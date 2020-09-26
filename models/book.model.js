const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
	name: { type: String },
	author: { type: String },
	isbn: { type: String },
	image: { type: String }
});

let Book = mongoose.model('Book', bookSchema, 'books');

module.exports = Book;