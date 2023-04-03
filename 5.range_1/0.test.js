import {isIterable, log, takeAll} from "../fx.js";

const L = {};
const value = [[1, 2], [3, 4], [6, 7, 8], [9]];

const curry = func => (arg, ...args) => {
  console.log(0, arg, args)
  return args.length ? func(arg, ...args) : (...args) => func(arg, ...args);
}

const map = curry((func, iter) => {
  console.log(9, iter)
  let res = [];

  for (const item of iter) {
    res.push(func(item));
    // 어떤 값을 수집할 것인지 func 함수에 위임 함으로 추상화 한다.
  }

  return res; // 함수는 인자 값과 반환 값으로 대화한다.
});

const reduce = curry((func, acc, iter) => {
  if(!iter) {
    iter = acc[Symbol.iterator]();
    acc = iter.next().value;
  }

  for (const item of iter) {
    acc = func(acc, item)
  }

  return acc
});

const go = (...args) => reduce((acc, fn) => {
  console.log(2)
  return fn(acc)
}, args);
const pipe = (fn, ...fns) => (...args) => {
  console.log(1)
  console.log(fn === L.map, fns[0] === L.flatten)
  console.log(args[1] === value)
  // args 는 map(a => a * a)와 value
  return go(fn(...args), ...fns)
}

L.map = curry(function* (fn, iter) {
  log(6)
  for (const a of iter) {
    yield fn(a);
  }
})

L.flatten = function* (iter) {
  log(3)
  for (const a of iter) {
    if (isIterable(a)) yield* a;
    else yield a;
  }
};

L.flatMap = (log(123), curry(pipe(
  L.map,
  L.flatten,
)));

let it = L.flatMap(map(a =>  a * a), value)
log(...it)
log(111, L.flatMap(map(a =>  a * a), value));

// L.flatMap 실행
// L.flatMap에 인자가 2개 들어가기 때문에 사실상 curry로 감싼 의미는 없음
// pipe는 go와 다르게 인자를 바로 받아 실행하지 않고 인자가 들어오면 실행시킬 함수를 준비함
// 