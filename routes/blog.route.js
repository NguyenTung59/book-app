const router = require('express').Router();

const controller = require('../controllers/blog.controller');

router.get('/', controller.index);

module.exports = router;