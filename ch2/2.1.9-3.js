const arr = [1, 3, 2, 7, 2, 6, 3, 5];

const s = new Set(arr);
const result = Array.from(s);
console.log(result); // 1, 3, 2, 7, 6, 5
