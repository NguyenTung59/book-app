const cloudinary = require('cloudinary').v2;
const env = require('dotenv');

const Book = require('../models/book.model');

cloudinary.config({
	cloud_name: 'codersx-sora',
	api_key: '997984551835688',
	api_secret: 'fIAFWc3QbIEOLv9d-H3YvcHn7og'
});

module.exports.index = async (req, res, next) => {
	const books = await Book.find();
	let page = parseInt(req.query.page) || 1;
	let perPage = 6;
	let maxPage = Math.round(books.length / perPage);

	var pre = page - 1;
	var next;

	if (page == maxPage) {
		next = maxPage;
	} else {
		next = page + 1;
	}

	let start = (page - 1) * perPage;
	let end = page * perPage;

	const book = books.slice(start, end);

	res.render('home/index', {
		books: book,
		page: page,
		pre: pre,
		next: next
	});

	next();
};

module.exports.addBook = (req, res) => {
	res.render('products/add');
};

module.exports.postBook = async (req, res, next) => {
	const file = req.files.image;
	const image = await cloudinary.uploader.upload(
		file.tempFilePath,
		(error, result) => {
			success: true;
		}
	);

	//Add a new book
	const book = new Book({
		name: req.body.name,
		author: req.body.author,
		isbn: req.body.isbn,
		image: image.url
	});

	try {
		const addedbook = await book.save();
		res.redirect('/');
		next();
	} catch (err) {
		res.status(400).send(err);
	}
};

module.exports.allBook = async (req, res, next) => {
	console.log(req.query.genre);
	const books = await Book.find({ genre: req.query.genre });
	let page = parseInt(req.query.page) || 1;
	let perPage = 9;
	let maxPage = Math.round(books.length / perPage);

	var pre = page - 1;
	var next;

	if (page == maxPage) {
		next = maxPage;
	} else {
		next = page + 1;
	}

	let start = (page - 1) * perPage;
	let end = page * perPage;

	const book = books.slice(start, end);

	res.render('products/books', {
		books: book,
		page: page,
		pre: pre,
		next: next
	});

	next();
};

// search books view books
module.exports.searchBook = async (req, res, next) => {
	try {
		const q = req.query.q;
		const findBook = await Book.find();

		const nameBooks = findBook.filter(
			book => book.name.toLowerCase().indexOf(q.toLowerCase()) !== -1
		);

		const authorBooks = findBook.filter(
			book => book.author.toLowerCase().indexOf(q.toLowerCase()) !== -1
		);

		// res.send(nameBooks, authorBooks);
		res.render('products/search', { q, nameBooks, authorBooks });

		next();
	} catch (err) {
		res.status(400).send('Not find book');
	}
};

// search books view books
module.exports.viewBook = async (req, res, next) => {
	try {
		const name = req.params.name;

		const book = await Book.findOne({ name });
		// res.send(book);
		res.render('products/book', { book });
	} catch (err) {
		res.status(400).send('Not find book');
	}

	next();
};

// edit book
module.exports.editBook = async (req, res, next) => {
	// const bookId = req.query.id;
	res.render('products/book/id', 'bookId');
};
