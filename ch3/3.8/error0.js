setInterval(() => {
  console.log('시작');
  throw new Error('서버를 고장내주마!');
}, 1000);
