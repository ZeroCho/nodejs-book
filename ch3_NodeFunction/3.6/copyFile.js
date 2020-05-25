const fs = require('fs');

fs.copyFile('readme4.txt', 'writeme4.txt', (error) => {
  if (error) {
    return console.error(error);
  }
  console.log('복사 완료');
});
