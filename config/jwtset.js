require('dotenv').config();
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_KEY;

exports.getToken = async id => {
    const payload = { num: id };
    return new Promise((resolve, reject) => {
        jwt.sign(payload, secret, { expiresIn: '10h' }, (error, token) => {
            if (error) {
                reject(error);
            } else {
                resolve(token);
            }
        });
    });
};

exports.getRefreshToken = async () => {
    return new Promise((resolve, reject) => {
        jwt.sign({}, secret, { expiresIn: '7d' }, (error, token) => {
            if (error) {
                reject(error);
            } else {
                resolve(token);
            }
        });
    });
};

exports.jwtVerify = async token => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, secret, (error, decoded) => {
            if (error) {
                reject(error);
            } else {
                resolve(decoded);
            }
        });
    });
};

/**
 * 리프레시 펑션 만들기
 */
