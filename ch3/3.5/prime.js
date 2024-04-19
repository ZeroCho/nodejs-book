const min = 2;
const max = 10000000;
const primes = [];

function findPrimes(start, end) {
  let isPrime = true;
  for (let i = start; i <= end; i++) {
    for (let j = min; j < Math.sqrt(end); j++) {
      if (i !== j && i % j === 0) {
        isPrime = false;
        break;
      }
    }
    if (isPrime) {
      primes.push(i);
    }
    isPrime = true;
  }
}

console.time('prime');
findPrimes(min, max);
console.timeEnd('prime');
console.log(primes.length);
