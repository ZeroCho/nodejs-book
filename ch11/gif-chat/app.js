const http = require('http');
const io = require('socket.io');
const express = require('express');
const path = require('path');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const index = require('./routes/index');

const app = express();

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

const server = http.createServer(app);


server.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 대기중');
});
