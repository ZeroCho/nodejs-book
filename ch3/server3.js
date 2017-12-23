const http = require('http');

function parseCookies(req) {
  const list = {};
  const cookieString = req.headers.cookie;
  if (cookieString) {
    cookieString.split(';').forEach((cookie) => {
      const parts = cookie.split('=');
      list[parts.shift().trim()] = decodeURI(parts.join('='));
    });
  }
  return list;
}

http.createServer((req, res) => {
  console.log('request');
  const cookies = parseCookies(req);
  console.log(req.url, cookies);
  res.writeHead(200, { 'Set-Cookie': 'mycookie=test' });
  res.end('Hello Cookie');
})
  .listen(8082, () => {
    console.log('8082번 포트에서 서버 대기중입니다!');
  });
