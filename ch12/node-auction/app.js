const express = require('express');
const path = require('path');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');

const index = require('./routes/index');
const auth = require('./routes/auth');
const { sequelize } = require('./models');
const passportConfig = require('./passport');
const checkAuction = require('./checkAuction');

const app = express();
sequelize.sync();
passportConfig(passport);
checkAuction();

const COOKIE_SECRET = process.env.COOKIE_SECRET || 'auction';
const sessionMiddleware = session({
  resave: false,
  saveUninitialized: false,
  secret: COOKIE_SECRET,
  cookie: {
    httpOnly: true,
    secure: false,
  },
});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.set('port', 8010 || process.env.PORT);

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/img', express.static(path.join(__dirname, 'uploads')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(COOKIE_SECRET));
app.use(sessionMiddleware);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use('/', index);
app.use('/auth', auth);

app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use((err, req, res) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

const server = app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 대기중');
});
const SSE = require('sse');

const sse = new SSE(server);
sse.on('connection', (client) => {
  setInterval(() => {
    client.send(new Date().valueOf().toString());
  }, 1000);
});

const io = require('socket.io')(server, { path: '/socket.io' });

app.set('io', io);

io.on('connection', (socket) => {
  const req = socket.request;
  const { headers: { referer } } = req;
  const roomId = referer.split('/')[referer.split('/').length - 1];
  socket.join(roomId);
  socket.on('disconnect', () => {
    socket.leave(roomId);
  });
});
