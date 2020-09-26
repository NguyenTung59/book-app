const express = require('express');

const controller = require('../controllers/book.controller');

const router = express.Router();

router.get('/', controller.index);

router.get('/home', controller.index);

router.get('/books', controller.allBook);

router.get('/search', controller.searchBook);

router.get('/:name', controller.viewBook);

router.get('/book/add', controller.addBook);

router.post('/book/add', controller.postBook);

router.get('/:id', controller.editBook);
router.put('/:id', controller.putBook);

module.exports = router;
