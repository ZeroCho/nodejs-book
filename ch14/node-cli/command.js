#!/usr/bin/env node
const program = require('commander');

program
  .version('0.0.1', '-v, --version')
  .action(() => {
    console.log('hi');
  });

program
  .command('template')
  .usage('[options]')
  .usage('[abc]')
  .description('템플릿을 생성합니다.')
  .alias('tmpl')
  .option('-t, --type <template>', '템플릿 종류를 정하세요.', 'html')
  .option('-n, --name <name>', '파일명을 입력하세요.', 'index')
  .option('-p, --path [path]', '파일 경로를 입력하세요', '.')
  .action((options) => {
    console.log(options);
  });

program
  .parse(process.argv);
