const a = {}
a.b; // a가 객체이므로 문제 없음

const c = null;
try {
  c.d;
} catch (e) {
  console.error(e); // TypeError: Cannot read properties of null (reading 'd')
}
c?.d; // 문제 없음

try {
  c.f();
} catch (e) {
  console.error(e); // TypeError: Cannot read properties of null (reading 'f')
}
c?.f(); // 문제 없음

try {
  c[0];
} catch (e) {
  console.error(e); // TypeError: Cannot read properties of null (reading '0')
}
c?.[0]; // 문제 없음
