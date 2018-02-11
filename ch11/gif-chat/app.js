const express = require('express');
const path = require('path');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require('connect-flash');
const axios = require('axios');
const ColorHash = require('color-hash');

const index = require('./routes/index');
const connect = require('./schemas');

const app = express();
connect();
const COOKIE_SECRET = process.env.COOKIE_SECRET || 'gifchat';
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
app.set('port', 8005 || process.env.PORT);

app.use(morgan('dev'));
app.use(cookieParser(COOKIE_SECRET));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(sessionMiddleware);
app.use(flash());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/gif', express.static(path.join(__dirname, 'uploads')));

app.use((req, res, next) => {
  if (!req.session.color) {
    const colorHash = new ColorHash();
    req.session.color = colorHash.hex(req.sessionID);
  }
  next();
});

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

app.set('io', io);
const room = io.of('/room');
const chat = io.of('/chat');

io.use((socket, next) => {
  sessionMiddleware(socket.request, socket.request.res, next);
});

room.on('connection', (socket) => {
  console.log('room 네임스페이스에 접속');
  socket.on('disconnect', () => {
    console.log('room 네임스페이스 접속 해제');
  });
});

chat.on('connection', (socket) => {
  console.log('chat 네임스페이스에 접속');
  const req = socket.request;
  const { headers: { referer } } = req;
  const roomId = referer.split('/')[referer.split('/').length - 1].replace(/\?.+/, '');
  socket.join(roomId);
  socket.to(roomId).emit('join', {
    user: 'system',
    chat: `${req.session.color}님이 입장하셨습니다.`,
  });
  socket.on('disconnect', () => {
    console.log('chat 네임스페이스 접속 해제');
    socket.leave(roomId);
    const currentRoom = socket.adapter.rooms[roomId];
    const userCount = currentRoom ? currentRoom.length : 0;
    if (userCount === 0) {
      axios.delete(`http://localhost:8005/room/${roomId}`)
        .then(() => {
          console.log('방 제거 요청 성공');
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      socket.to(roomId).emit('exit', {
        user: 'system',
        chat: `${req.session.color}님이 퇴장하셨습니다.`,
      });
    }
  });
  socket.on('chat', (data) => {
    socket.to(data.room).emit(data);
  });
});
