const promise = new Promise((res, rej) => {
  setTimeout(() => {
    res("a");
  }, 5000);
});

console.log(1);
console.log(2);
console.log(3);
console.log(5);
console.log(8);
console.log(7);
console.log(8);

//promise.then((결과값) => {  //결과값 ㅅ ㅏ용 가능})

promise
  .then((res) => {
    console.log(res);
  })
  .catch((e) => {
    console.log(e);
  });

function callback() {
  console.log("a");
}
setTimeout(callback, 1000);
