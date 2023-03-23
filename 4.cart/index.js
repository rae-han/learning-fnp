const products = [
  {name: '반팔티', price: 15000, quantity: 1, is_selected: true},
  {name: '긴팔티', price: 20000, quantity: 2, is_selected: false},
  {name: '핸드폰케이스', price: 15000, quantity: 3, is_selected: true},
  {name: '후드티', price: 30000, quantity: 4, is_selected: false},
  {name: '바지', price: 25000, quantity: 5, is_selected: false}
];

const log = console.log;

const add = (a, b) => a + b;

// const curry = func => (a, ...rest) => rest.length ? func(a, ...rest) : (...rest) => func(a, ...rest);

const curry = func => (arg, ...args) => args.length ? func(arg, ...args) : (...args) => func(arg, ...args);

const _map = (func, iter) => {
  let res = [];

  for (const item of iter) {
    res.push(func(item));
    // 어떤 값을 수집할 것인지 func 함수에 위임 함으로 추상화 한다.
  }

  return res; // 함수는 인자 값과 반환 값으로 대화한다.
};

const map = curry(_map);

const _filter = (func, iter) => {
  let res = [];

  for (const item of iter) {
    if (func(item)) {
      res.push(item);
    }
  }

  return res;
};
const filter = curry(_filter);

const _reduce = (func, acc, iter) => {
  if (!iter) {
    iter = acc[Symbol.iterator]();
    acc = iter.next().value;
  }

  for (const item of iter) {
    acc = func(acc, item);
  }

  return acc;
};
const reduce = curry(_reduce);

const go = (...args) => reduce((arg, func) => func(arg), args);

const pipe1 = (...fs) => (arg) => go(arg, ...fs)
const pipe2 = (func, ...fs) => (...args) => go(func(...args), ...fs)

const pipe = (func, ...fs) => (...args) => go(func(...args), ...fs)