import {curry, go, L, log, pipe, range, take} from '../fx.js'

L.map = curry(function* (fn, iter) {
  iter = iter[Symbol.iterator](); // 1
  let cur; // 2

  while (!(cur = iter.next()).done) {
    const a = cur.value

    yield fn(a); // 3
  }
})
let map = curry((fn, iter) => {
  let res = []; // 1 어떤 인자가 어떻게 들어오는지 확인

  iter = iter[Symbol.iterator]();
  let cur; // 2 이터레이터가 어떻게 변하는지 확인

  while (!(cur = iter.next()).done) {
    const value = fn(cur.value);
    res.push(value) // 3 value(a) 값을 확인
  }

  return res; // 4 리턴
});

log(map(a => a + 10, range(4)))
log(map(a => a + 10, L.range(4)))
// L.range 를 써도 정상 동작 한다.
// map 이 symbol.iterator를 통해 이터러블 객체를 이터레이터로 만들어 사용하고 있기 때문
// 그냥 map을 바꾸는 법
map = curry((fn, iter) => go(
  iter,
  L.map(fn)
))

log(map(a => a + 10, range(4))) // Generator 로 앞으로 평가할 수 있는 준비가 돼 있는 지연된 값이 된다

map = curry((fn, iter) => go(
  iter,
  L.map(fn),
  take(Infinity) // take를 통해 모두 가져와준다.
))

log(map(a => a + 10, range(4)))

map = curry((fn, iter) => go(
  L.map(fn, iter), // 사실 이렇게 해도 된다. 근데 처음 받는 인자랑 똑 같네?
  take(Infinity)
))

map = curry(pipe(
  L.map,
  take(Infinity)
))

log(map(a => a + 10, range(4)))

L.filter = curry(function* (fn, iter) {
  iter = iter[Symbol.iterator](); // 1
  let cur; // 2

  while (!(cur = iter.next()).done) {
    const a = cur.value

    if (fn(a)) { // 3
      yield a; // 4
    }
  }
})

let filter = curry(pipe(
  L.filter,
  take(Infinity),
));

log(filter(a => a%2, range(4)))

// 여기서 생각해볼 만한게 take(Infinity) 가 겹치므로
const takeAll = take(Infinity);

map = curry(pipe(
  L.map,
  takeAll,
))

log(map(a => a + 10, range(4)))

filter = curry(pipe(
  L.filter,
  takeAll,
));

log(filter(a => a%2, range(4)))

// L.map, L.filter 는 로그를 찍기 위해 코드를 변형 시켰던 것.
// L.map = curry(function* (fn, iter) {
//   for (const a of iter) yield fn(a);
// })
// L.filter = curry(function* (fn, iter) {
//   for (const a of iter) if (fn(a)) yield a;
// })
L.map = curry(function* (fn, iter) {
  for (const a of iter) {
    yield fn(a);
  }
})
L.filter = curry(function* (fn, iter) {
  for (const a of iter) {
    if (fn(a)) yield a;
  }
})


