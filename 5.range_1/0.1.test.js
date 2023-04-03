const log = console.log;

const L = {};
const value = [[1, 2], [3, 4], [6, 7, 8], [9]];
const lg = (l, tag) => console.log(`#### ${l} ${tag ? tag : ''} ${l} ####`)

const isIterable = a => a && a[Symbol.iterator];

const curry = func => (arg, ...args) => {
  console.log(0, arg, args)
  console.log(!!args.length)
  return args.length ? func(arg, ...args) : (...args) => func(arg, ...args);
}

const map = curry((func, iter) => {
  lg(12)
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
  lg(4)
  return fn(acc)
}, args);
const pipe = (fn, ...fns) => (...args) => {
  lg(3)
  log(fn === L.map, fns[0] === L.flatten)
  log(args[1] === value)
  // args 는 map(a => a * a)와 value
  return go(fn(...args), ...fns)
}

L.map = (function* (fn, iter) {
  lg(9)
  for (const a of iter) {
    lg(11)
    yield fn(a);
  }
})

L.flatten = function* (iter) {
  lg(6)
  for (const a of iter) {
    lg(8);
    if (isIterable(a)) yield* a;
    else yield a;
  }
};

L.flatMap = curry(pipe( // # 2
  L.map,
  L.flatten,
));

lg(2)
let it = L.flatMap(map(a =>  a * a), value) // # 1
log(111, ...it)
// log(111, L.flatMap(map(a =>  a * a), value));

// 1. L.flatMap 실행
// 2. L.flatMap에 인자가 2개 들어가기 때문에 사실상 curry로 감싼 의미는 없음
// 3. L.flatMap의 pipe 함수를 실행 함. pipe는 go와 다르게 인자를 바로 받아 실행하지 않고 인자가 들어오면 실행시킬 함수를 준비함
//    그 pipe 함수에는 L.map과 L.flatten이 있음.

// 1. L.flatMap을 만든다. L.flatMap은 인자를 받을 준비를 하는 함수로 인자를 받으면 L.map과 L.flatten을 차례로 실행시켜 준다. L.flatMap의 내부 함수 pipe를 curry로 감싸긴 했지만 실행시 인자 2개를 같이 넣어줄 것이기 때문에 의미 없다.
// 2. L.flatMap을 실행시켜준다. 첫번째 인자로 map(a => a * a) 두번째 인자로 value 값을 넣는다. 넣은 값은 L.map으로 간다.
// 3. L.map과 L.flatMap의 인자로 들어온 인자(a => a * a, value)는 L.map과 합성된다.
// 3-1. 하지만 L.map 안에 log가 찍히지 않는다.
// 4. 왜냐면 제너레이터는 값이 필요해질 때(next()) 코드가 실행된다. 첫 번째 값이 필요 없다면 아예 실행되지 않고 map(a => a * a)와 value가 들어간 상태로 대기?한다.
// 5.그 후 L.flatMap 함수를 평가해 값을 하나씩 가져오게 되면 L.flatten으로 가서 값을 만드려 하는데 iter 값이 없으므로 L.map으로 간다.
// 6. L.map 으로 가서 값을 만드는데 이터러블한 데이터를 하나 가져와서 3번에서 인자로 받은 map(a => a * a)을 이용해 값을 다룬 후 yield로 보내준다.
// 7. 차례대로 값을 가져온다.