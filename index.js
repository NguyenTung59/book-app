require('dotenv').config();

// module require npm
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const fileupload = require('express-fileupload');

//verify token
const verify = require('./verify/verifyToken');

// Connect to DB
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true }, () =>
	console.log('connected to db!')
);

// Import routes
const bookRoute = require('./routes/book.route');
const userRoute = require('./routes/user.route');
const authRoute = require('./routes/auth.route');
const blogRoute = require('./routes/blog.route');

// Import middleware
const authMiddleware = require('./middlewares/auth.middleware');

const app = express();
// port
const port = process.env.PORT || 3000;

// template engine
app.set('view engine', 'pug');
app.set('views', './views');

app.use(cookieParser(process.env.SESSION_SECRET));

// body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
	fileupload({
		useTempFiles: true
	})
);

// Static file
app.use(express.static('public'));

// Route Middleware
app.use('/auth', authRoute);
app.use('/', authMiddleware.requireAuth, bookRoute);
app.use('/user', verify, userRoute);
app.use('/blog', verify, blogRoute);
// listen
app.listen(port, err => {
	if (err) {
		console.error('❌ Unable to connect the server: ', err);
	}
	console.log(`🌍 Server listening on port ` + port);
});
