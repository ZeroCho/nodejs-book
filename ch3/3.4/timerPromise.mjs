import { setTimeout, setInterval } from 'timers/promises';

await setTimeout(3000);
console.log('3초뒤 실행');

for await (const startTime of setInterval(1000, Date.now())) {
    console.log('1초마다 실행', new Date(startTime));
}