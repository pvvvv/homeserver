const express = require('express');
const router = express.Router();
const db = require('../../models');

router.get('/', async (req, res, next) => {
    let result = {};
    try {
        let data = await db.user.findOne({
            where: { userNum: req.body.userNum },
        });
        result.userName = data.nickname;
        result.userNum = req.body.userNum;
        res.render('index.ejs', { result });
    } catch (error) {
        next(error);
    }
});

module.exports = router;
