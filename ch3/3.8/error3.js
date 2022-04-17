const fs = require('fs').promises;

setInterval(() => {
  fs.unlink('./abcdefg.js').catch(console.error);
}, 1000);
