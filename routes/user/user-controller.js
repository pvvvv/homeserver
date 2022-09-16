var db = require('../../models');
var sequelize = require('sequelize');
const logger = require('../../config/logger');

exports.join = async function (req, res, next) {
    var { id, password, name, birthday } = req.body;

    try {
        var data = await db.user.create({
            id: id,
            password: password,
            name: name,
            birthday: birthday,
        });
        res.json({ good: 'good' });
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
