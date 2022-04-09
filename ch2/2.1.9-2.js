const s = new Set();
s.add(false); // add(요소)로 Set에 추가합니다.
s.add(1);
s.add('1');
s.add(1); // 중복이므로 무시됩니다.
s.add(2);

console.log(s.size); // 중복이 제거되어 4

s.has(1); // has(요소)로 요소 존재 여부를 확인합니다.
console.log(s.has(1)); // true

for (const a of s) {
  console.log(a); // false 1 '1' 2
}

s.forEach((a) => {
  console.log(a); // false 1 '1' 2
})

s.delete(2); // delete(요소)로 요소를 제거합니다.
s.clear(); // clear()로 전부 제거합니다.
