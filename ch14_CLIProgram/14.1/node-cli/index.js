#!/usr/bin/env node
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.clear();
const answerCallback = (answer) => {
  if (answer === 'y') {
    console.log('감사합니다!');
    rl.close();
  } else if (answer === 'n') {
    console.log('죄송합니다!');
    rl.close();
  } else {
    console.clear();
    console.log('y 또는 n만 입력하세요.');
    rl.question('예제가 재미있습니까? (y/n) ', answerCallback);
  }
};

rl.question('예제가 재미있습니까? (y/n) ', answerCallback);
