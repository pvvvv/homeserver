const createError = require('http-errors');
const Express = require('express');
const path = require('path');
const helmet = require('helmet');
const { sequelize } = require('./models');
const { stream, logger } = require('./config/logger');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const checkAuth = require('./common/authCheck');
const db = require('./models');
const jwt = require('./config/jwtset');

const app = new Express();

app.io = require('socket.io')();

app.io.on('connection', async socket => {
    if (socket.request.headers.cookie !== undefined) {
        var tokenInfo = await jwt.jwtVerify(socket.request.headers.cookie.substring(6));
        let data = await db.user.findOne({
            where: { userNum: tokenInfo.num },
        });
        socket.data.username = data.nickname;
        // if (socket.data.username == 'BP') {
        //     socket.join('room1');
        // }
        const sockets = await app.io.fetchSockets();
        let userArr = [];
        sockets.forEach(sc => {
            userArr.push(sc.data.username);
        });

        app.io.emit('talk on nickname', { data: userArr });
    }
    var talkdata = await db.talk.findAll({
        include: [{ model: db.user }],
        limit: 30,
        order: [['id', 'DESC']],
    });

    talkdata.sort(function (a, b) {
        return a.id - b.id;
    });

    app.io.emit('talk on', talkdata);
    socket.on('chat message', async msg => {
        app.io.emit('chat message', msg);
        await db.talk.create({ userNum: msg[0], talkString: msg[1] });
    });

    socket.on('disconnect', async () => {
        const sockets = await app.io.fetchSockets();
        let userArr = [];
        sockets.forEach(sc => {
            userArr.push(sc.data.username);
        });

        app.io.emit('talk on nickname', { data: userArr });
        console.log('user disconnected');
    });
});

const indexRouter = require('./routes');
const userRouter = require('./routes/user');
const mainRouter = require('./routes/main');
sequelize.sync({ force: false }); //테이블 생성할때 한번 사용. 잘못쓰면 데이터 날아감

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
// app.set('view engine', 'html');

app.set('trust proxy', 1)
    .use(helmet({ contentSecurityPolicy: false }))
    .use(Express.json())
    .use(Express.urlencoded({ extended: false }))
    .use(cookieParser())
    .use(Express.static(path.join(__dirname, 'public')))
    .use(
        morgan(
            ':method | :remote-addr | :remote-user | :url | HTTP/:http-version | :status | :res[content-length] | :user-agent | :referrer | :response-time ms',
            { stream },
        ),
    )
    .use(checkAuth);

app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/main', mainRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    logger.error(err);
    // render the error page
    res.status(err.status || 500);
    res.send('Error');
});

module.exports = app;
