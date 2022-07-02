import fs from 'fs/promises';

fs.readFile('package.json')
    .then((result) => { // result는 Buffer 타입입니다.
        console.log(result);
    })
    .catch(console.error);