const promise1 = Promise.resolve('성공1');
const promise2 = Promise.reject('실패2');
const promise3 = Promise.resolve('성공3');
Promise.allSettled([promise1, promise2, promise3])
  .then((result) => {
    console.log(result);
/* [
*    { status: 'fulfilled', value: '성공1' },
*    { status: 'rejected', reason: '실패2' },
*    { status: 'fulfilled', value: '성공3' }
*  ]
*/
  })
  .catch((error) => {
    console.error(error);
  });
