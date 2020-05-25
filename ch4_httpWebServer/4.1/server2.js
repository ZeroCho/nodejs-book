const http = require('http');
const fs = require('fs');

http.createServer((req, res) => {
  fs.readFile('./server2.html', (err, data) => {
    if (err) {
      throw err;
    }
    res.end(data);
  });
}).listen(8081, () => {
  console.log('8081번 포트에서 서버 대기중입니다!');
});
