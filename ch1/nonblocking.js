function longRunningTask() {
  // 오래 걸리는 작업
  console.log('작업 끝');
}
console.log('시작');
setTimeout(longRunningTask, 0);
console.log('다음 작업');
