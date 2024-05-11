const spawn = require('child_process').spawn;
const path = require('path');

const pythonCodePath = path.join(__dirname, 'test.py');
const process = spawn('python', [pythonCodePath]);

process.stdout.on('data', function(data) {
  console.log(data.toString());
}); // 실행 결과

process.stderr.on('data', function(data) {
  console.error(data.toString());
}); // 실행 에러
