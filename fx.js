const products = [
  {name: '반팔티', price: 15000, quantity: 1, is_selected: true},
  {name: '긴팔티', price: 20000, quantity: 2, is_selected: false},
  {name: '핸드폰케이스', price: 15000, quantity: 3, is_selected: true},
  {name: '후드티', price: 30000, quantity: 4, is_selected: false},
  {name: '바지', price: 25000, quantity: 5, is_selected: false}
];

const log = console.log;
const add = (a, b) => a + b;
const L = {};

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
  if(!iter) {
    iter = acc[Symbol.iterator]();
    acc = iter.next().value;
  }

  for (const item of iter) {
    acc = func(acc, item)
  }

  return acc
};
const reduce = curry(_reduce);

// const go = (...args) => reduce((acc, fn) => fn(acc), args);
const go = (...args) => reduce((acc, fn) => {
  console.log(acc, '////', fn)
  return fn(acc)
}, args);

// const pipe1 = (...fns) => (arg) => go(arg, ...fns)
// const pipe2 = (func, ...fns) => (...args) => go(func(...args), ...fns)

const pipe = (func, ...fns) => (...args) => go(func(...args), ...fns)

const sum = (fn, args) => pipe(
  map(fn),
  reduce(add),
)(args)

const sum2 = (fn, args) => go(
  args,
  map(fn),
  reduce(add)
)

const range = len => {
  let i = -1;
  let res = [];

  while(++i < len) {
    res.push(i)
  }

  return res;
}

L.range = function* (len) {
  let i = -1;

  while(++i < len) {
    yield i;
  }
}

const take = curry((l, iter) => {
  let res = [];
  for (const a of iter) {
    res.push(a);
    if (res.length === l) return res;
  }
  return res;
});

L.map = curry(function* (fn, iter) {
  for (const a of iter) {
    yield fn(a);
  }
})

L.filter = curry(function* (fn, iter) {
  for (const i of iter) {
    if (fn(i)) {
      yield i;
    }
  }
})

export {
  log,
  add,
  L,
  curry,
  map,
  filter,
  reduce,
  go,
  pipe,
  sum,
  range,
  take,
}

