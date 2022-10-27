const jwt = require('../config/jwtset');
const { logger } = require('../config/logger');

var checkAuth = async (req, res, next) => {
    var requestPath = req.path;
    logger.info("checkAuth :: User Request Path is '" + requestPath + "'");
    try {
        if (requestPath == '/' || requestPath == '/user/login' || requestPath == '/user/join') {
            next();
        } else {
            if (req.cookies.token !== undefined) {
                logger.info('Token Exists');
                var getTokenInfo = await jwt.jwtVerify(req.cookies.token);
                if (getTokenInfo.num > 0) {
                    req.body.userNum = getTokenInfo.num;
                    // var result = await checkLastUse(req);
                    // if (result) {
                    //     next();
                    // } else {
                    //     res.status(400).send('Bad Token');
                    // }
                    next();
                } else {
                    logger.info('invalid token or End of Token Validity Period');
                    res.status(401).send('invalid token');
                }
            } else {
                res.redirect('/');
            }
        }
    } catch (error) {
        if (error == 'JsonWebTokenError: invalid signature') {
            logger.info('invalid token or End of Token Validity Period');
            res.status(401).send('invalid token');
        } else {
            next(error);
        }
    }
};

// var checkLastUse = async req => {
//     var { userNum } = req.body;
//     var time = moment().format('YYYY-MM-DD HH:mm:ss');

//     try {
//         var isUser = await await db.user.findOne({
//             where: { userNum: userNum },
//         });
//         if (isUser !== null) {
//             await db.user.update(
//                 { lastLogin: time },
//                 {
//                     where: {
//                         userNum: userNum,
//                     },
//                 },
//             );

//             return true;
//         } else {
//             return 0;
//         }
//     } catch (error) {
//         logger.error(error);
//     }
// };

module.exports = checkAuth;
