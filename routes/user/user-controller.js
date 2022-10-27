const db = require('../../models');
const { logger } = require('../../config/logger');
const crypto = require('../../common/crypto');
const jwt = require('../../config/jwtset');

exports.login = async function (req, res, next) {
    var { id, password } = req.body;
    var result = {};
    var statusNum;

    try {
        var hasId = await db.user.findOne({
            where: {
                id: id,
            },
        });
        if (hasId !== null) {
            var verifyPw = await crypto.oneWayVerify(hasId.password, password);
            if (verifyPw) {
                res.cookie('token', await jwt.getToken(hasId.userNum), {
                    maxAge: 36000000,
                });
                result.status = 'success';
                statusNum = 200;
            } else {
                result.status = 'fail';
                statusNum = 400;
            }
        } else {
            result.status = 'fail';
            statusNum = 401;
        }

        res.status(statusNum).json(result);
    } catch (error) {
        next(error);
    }
};
