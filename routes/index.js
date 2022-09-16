var express = require('express');
var router = express.Router();

router.get('/', (req, res, next) => {
    try {
        res.render('index');
    } catch (error) {
        next(error);
    }
});

module.exports = router;
