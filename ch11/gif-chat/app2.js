const express = require('express');
const path = require('path');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const index = require('./routes/index');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.set('port', process.env.PORT || 8005);

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
const WebSocket = require('ws');

const wss = new WebSocket.Server({ server });

wss.on('connection', (ws, req) => {
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  console.log('새로운 클라이언트 접속', ip);
  ws.on('message', (message) => {
    console.log(message);
  });
  ws.on('error', (error) => {
    console.error(error);
  });
  ws.on('close', () => {
    console.log('클라이언트 접속 해제', ip);
    clearInterval(ws.interval);
  });
  const interval = setInterval(() => {
    if (ws.readyState === ws.OPEN) {
      ws.send('서버에서 클라이언트로 메시지를 보냅니다.');
    }
  }, 3000);
  ws.interval = interval;
});
