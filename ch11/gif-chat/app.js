const express = require('express');
const path = require('path');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const index = require('./routes/index');
const connect = require('./schemas');

const app = express();
connect();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.set('port', 8005 || process.env.PORT);

app.use(morgan('dev'));
app.use(cookieParser('gifchat'));
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: 'gifchat',
  cookie: {
    httpOnly: true,
    secure: false,
  },
}));

app.use('/', index);

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
const io = require('socket.io')(server, { path: '/socket.io' });

io.on('connection', (socket) => {
  const req = socket.request;
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  console.log('새로운 클라이언트 접속!', ip);
  socket.on('disconnect', () => {
    console.log('클라이언트 접속 해제', ip);
    clearInterval(socket.interval);
  });
  socket.on('error', (error) => {
    console.error(error);
  });
  socket.on('reply', (data) => {
    console.log(data);
  });
  socket.interval = setInterval(() => {
    socket.emit('news', 'Hello Socket.IO');
  }, 3000);
});
