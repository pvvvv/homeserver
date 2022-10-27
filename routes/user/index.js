var express = require('express');
var router = express.Router();
var userController = require('./user-controller');

/* 로그인 */
router.post('/login', userController.login);

module.exports = router;
