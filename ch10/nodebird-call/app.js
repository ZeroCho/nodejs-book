const express = require('express');
const path = require('path');
const morgan = require('morgan');

const index = require('./routes/index');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.set('port', 8002 || process.env.PORT);

app.use(morgan('dev'));

app.use('/', index);

app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 대기중');
});
