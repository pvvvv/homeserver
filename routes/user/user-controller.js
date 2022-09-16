var db = require('../../models');
const logger = require('../../config/logger');

exports.findOverleb = async function (req, res, next) {
    var { id } = req.body;
    var result = {};
    var statusNum;

    try {
        var hasId = await db.user.findOne({
            where: { id: id },
        });
        if (hasId !== null) {
            statusNum = 205;
            result.status = 0;
            result.message = '중복입니다';
        } else {

        }

        res.status(statusNum).json(result);
    } catch (error) {
        next(error);
    }
};

exports.join = async function (req, res, next) {
    var { id, password, name, birthday } = req.body;
    var result = {};
    var statusNum;

    try {
        var hasData = await db.user.findOne({
            where: { id: id },
        });
        if (hasData !== null) {
            db.user.create({
                id: id,
                password: password,
                name: name,
                birthday: birthday,
            });

            statusNum = 200;
            result.status = 1;
            result.message = '가입완료';
        } else {
            statusNum = ;
            result.status = 0;
            result.message = '아이디 중복인데 어떻게 들어왔냐...';
        }

        res.status(statusNum).json(result);
    } catch (error) {
        next(error);
    }
};

exports.login = async function (req, res, next) {
    var { id, password } = req.body;

    try {
        var data = await db.user.findOne({
            id: id,
            password: password,
        });
    } catch (error) {
        next(error);
    }
};
