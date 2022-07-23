//비동기 콜백
setTimeout(() => {
  console.log("a");
}, 1000);

//동기 콜백
// function calculator(callback, a, b) {
//   return callback(a, b);
// }

// console.log(
//   calculator(
//     function (x, y) {
//       return x + y;
//     },
//     3,
//     5
//   )
// );

// console.log(calculator((x, y) => x + y, 3, 5));
