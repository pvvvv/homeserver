var express = require('express');
var router = express.Router();
var userController = require('./user-controller');

router.get('/', (req, res, next) => {
    try {
        res.render('user.html');
    } catch (error) {
        next(error);
    }
});
router.post('/', userController.login);

router.get('/join', (req, res, next) => {
    try {
        res.render('join.html');
    } catch (error) {
        next(error);
    }
});
router.post('/join', userController.join);

router.get('/findid', (req, res, next) => {
    try {
        res.render('findid.html');
    } catch (error) {
        next(error);
    }
});

module.exports = router;
