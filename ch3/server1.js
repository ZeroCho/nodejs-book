const http = require('http');

http.createServer((req, res) => {
  res.write('<h1>Hello Node!</h1>');
  res.end('<p>Hello Server!</p>');
}).listen(8080, () => {
  console.log('8080번 포트에서 서버 대기중입니다!');
});
