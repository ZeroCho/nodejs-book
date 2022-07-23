let a = 2;

// setTimeout(() => {
//   a = 5;
//   console.log(a);
// }, 0);

//프로미스란 실행은 바로 하되 결과값을 나중에 원할때 쓸 수 있는것
//프로미스가 아닌 애들을 프로미스로 바꾸는 연습
const p = new Promise((resolve, reject) => {
  //이 부분은 동기임! Promise 안에서는 동기
  console.log("hi");
  setTimeout(() => {
    a = 5;
    console.log(a);
    resolve(a);
  }, 3000);
});

console.log("a:", a);
console.log(2);
console.log(3);

p.then((result) => {
  console.log("result : ", result);
});
