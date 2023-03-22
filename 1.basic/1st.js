const log = console.log

const apply10 = f => f(10);
const add5 = num => num + 5;

log(apply10(add5)) // 15

const times = (f, n) => {
  let i = -1;
  while( ++i < n) f(i)
}

times(log, 3) // 0 1 2
times((v) => log(v + 10), 3); // 10 11 12

const addMake = x => y => x + y;
const add10 = addMake(10);

log(add10(5)) // 15
log(add10(10)) // 20