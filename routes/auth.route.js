const express = require('express');

const controller = require('../controllers/auth.controller');
const { registerValidation, loginValidation } = require('../validates/user.validate');

const router = express.Router();

router.get('/login', controller.login);

router.post('/login', loginValidation, controller.postLogin);

router.get('/register', controller.register);

router.post('/register', controller.postRegister);

module.exports = router;