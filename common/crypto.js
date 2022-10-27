require('dotenv').config();
const crypto = require('crypto');
const key = crypto.scryptSync('wonwooPassword', 'wonwooSalt', 32); // 나만의 암호화키. password, salt, byte 순인데 password와 salt는 본인이 원하는 문구
const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY; // Must be 256 bits (32 characters)
const IV_LENGTH = 16; // For AES, this is always 16

exports.twoWayEncrypt = async str => {
    return new Promise((res, rej) => {
        let iv = crypto.randomBytes(IV_LENGTH); //초기화 벡터. 더 강력한 암호화를 위해 사용. 랜덤값이 좋음
        let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);
        const encrypted = cipher.update(str);
        res(iv.toString('hex') + ':' + Buffer.concat([encrypted, cipher.final()]).toString('hex'));
    });
};

exports.twoWayDecrypt = async encryptedStr => {
    return new Promise((res, rej) => {
        const textParts = encryptedStr.split(':');
        const iv = Buffer.from(textParts.shift(), 'hex');
        const encryptedText = Buffer.from(textParts.join(':'), 'hex');
        const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);
        const decrypted = decipher.update(encryptedText);

        res(Buffer.concat([decrypted, decipher.final()]).toString());
    });
};

exports.oneWayEncrypt = async str => {
    return new Promise((res, rej) => {
        const salt = crypto.randomBytes(64).toString('hex');

        crypto.scrypt(str, salt, 64, (err, encryptStr) => {
            if (err) {
                rej(err);
            } else {
                res(salt + ':' + encryptStr.toString('hex'));
            }
        });
    });
};

exports.oneWayVerify = async (encryptStr, str) => {
    return new Promise((res, rej) => {
        const [salt, key] = encryptStr.split(':');
        crypto.scrypt(str, salt, 64, (err, derivedKey) => {
            if (err) rej(err);
            res(key == derivedKey.toString('hex'));
        });
    });
};
