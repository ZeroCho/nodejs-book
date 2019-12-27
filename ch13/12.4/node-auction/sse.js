const SSE = require('sse');

module.exports = (server) => {
  const sse = new SSE(server);
  sse.on('connection', (client) => {
    setInterval(() => {
      client.send(Date.now().toString());
    }, 1000);
  });
};
