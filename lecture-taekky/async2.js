//비동기 함수인 setTimeout
//비동기 함수인지 찾아보는 방법 -> 검색.
setTimeout(() => {
  console.log("a");
}, 0);
setTimeout(() => {
  console.log("b");
}, 1000);
setTimeout(() => {
  console.log("c");
}, 2000);
//얘도 있긴한데 정확히 알려면 eventloop를 검색해서 정확히 봐야해서.. 그냥 넘어감 잘안쓸듯
// setImmediate(() => {
//   console.log("d");
// });
//마이크로큐가 이기는 (promise)
Promise.resolve().then(() => {
  console.log("내가 프라미스다");
});
//이걸 도식화로 분석해보자
