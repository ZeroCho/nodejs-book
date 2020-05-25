setImmediate(() => {
  console.log('immediate');
});
process.nextTick(() => {
  console.log('nextTick');
});
setTimeout(() => {
  console.log('timeout');
}, 0);
Promise.resolve().then(() => console.log('promise'));
