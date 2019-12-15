const fs = require('fs').promises;

setInterval(() => {
  fs.unlink('./abcdefg.js')
}, 1000);
