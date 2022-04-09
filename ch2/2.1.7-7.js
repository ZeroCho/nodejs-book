try {
  Promise.reject('에러');
} catch (e) {
  console.error(e); // UnhandledPromiseRejection: This error originated either by throwing inside...
}

Promise.reject('에러').catch(() => {
  // catch 메서드를 붙이면 에러 발생하지 않음
})
