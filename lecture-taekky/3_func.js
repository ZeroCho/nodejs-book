//require라는 함수는 노드에서 알아서 제공해주는 함수
const value = require("./2_var");
//구조분해 할당을 통해 이렇게도 할 수 있음
const { odd, even } = require("./2_var");
console.log(value);
console.log(odd, even);
function checkOddOrEven(num) {
  if (num % 2) return odd;
  return even;
}
//가져온 odd even을 다시 내보낼수도있음
module.exports = checkOddOrEven;
// export default checkOddOrEven;
