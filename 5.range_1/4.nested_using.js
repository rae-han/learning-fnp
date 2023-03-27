import {curry, filter, go, L, log, map, range, reduce, take} from '../fx.js'

// # 같은 문제를 즉시 평가와 지연 평가로 해결해보기

// ##
go(
  range(10),
  map(n => n + 10),
  filter(n => n % 2),
  take(2),
  log,
)

log(L)

// ##
go(
  L.range(10),
  L.map(n => n),
  take(2),
  log,
)

// ## map, filter, reduce의 for ... of에는 숨겨진 코드가 많다.
// 명령형으로 작성해서 대체해 보자.
// 그냥 for .. of 대신 아래 코드를 넣어주면 된다.
// iter = iter[Symbol.iterator]();
// let cur;
//
// while (!(cur = iter.next()).done) {
//   const a = cur.value

// range에서는 초기 값, push하는 곳(반복하는 곳) 리턴하는 곳에 브레이크 포인트 걸자
// 나머지는 아래 숫자에

const _map = (func, iter) => {
  let res = []; // 1 어떤 인자가 어떻게 들어오는지 확인

  iter = iter[Symbol.iterator]();
  let cur; // 2 이터레이터가 어떻게 변하는지 확인

  while (!(cur = iter.next()).done) {
    const value = cur.value;
    res.push(value) // 3 value(a) 값을 확인
  }

  return res; // 4 리턴
};

const _filter = (func, iter) => {
  let res = []; // 1

  iter = iter[Symbol.iterator]();
  let cur; // 2

  while (!(cur = iter.next()).done) {
    const value = cur.value;

    if (func(value)) res.push(value);
    // 3 윗 부분을 찍되 res.push 메서드도 둘 다 확인
  }

  return res; // 4
};

const take = curry((l, iter) => {
  let res = []; // 1

  iter = iter[Symbol.iterator]();
  let cur; // 2

  while (!(cur = iter.next()).done) {
    const value = cur.value;
    res.push(value); // 3

    if (res.length === l) return res; // 4
  }
  return res;
});
L.map = curry(function* (fn, iter) {
  iter = iter[Symbol.iterator](); // 1
  let cur; // 2

  while (!(cur = iter.next()).done) {
    const a = cur.value

    yield fn(a); // 3
  }
})
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
// 동일한 코드고 오히려 빠르게 작동할 것이다. 차이는 거의 안난다.

const _reduce = (func, acc, iter) => {
  if(!iter) {
    iter = acc[Symbol.iterator]();
    acc = iter.next().value;
  } else {
    iter = iter[Symbol.iterator]();
  }

  // iter = iter[Symbol.iterator](); // 다른 함수처럼 그냥 복붙해도 작동은 하지만 위 처럼 넣어주는게 더 좋을듯?
  let cur;

  while (!(cur = iter.next()).done) {
    const a = cur.value
    acc = func(acc, a)
  }

  return acc
};

// 지연평가 한 함수들은 앞선 range, map, filter 보다 take 함수를 먼저 실행한다.
// 즉 어떤 연산도 하지 않고 바로 take 값으로 들어 갔다.
// 또한 데이터는 iterator 가 들어온다.
// iterator는 본인이 이터레이터면서 본인이 Symbol.iterator를 가지고 있고
// 그걸 실행 했을때 iterator인 자기 자신을 리턴한다.
// 여담으로 이 함수는 배열이나 제너레이터 같은 어떤 이터러블, 이터레이터가 들어와도 잘 작동하도록
// 다형성이 유지될수 있게 된다.

// take의 while문으로 들어가기 전에 filter 함수로 들어간다.
// take에서는 filter가 리턴한 이터레이터를 받고 있기 때문에.
// take에서 next를 했을 때 filter 함수에서 평가가 시작된다.

// 또 filter 에서 next를 실행하려고 하면 map으로 가게 된다.
// 마찬가지로 map에서 next를 하면 range로 간다.

// range에서 만들어진 값이 map으로 넘어가서 함수가 적용된 값이 되고 filter로 넘어가서 조건을 만족한다면 값이 넘어가게 된다.

// 두 코드의 차이는 값을 전부 다 만드냐 아니면 하나하나 만들어 나가냐이다.
// 배열로 치면 하나의 배열을 모두 만드는 것이냐 아니면 하나하나 채워나가느냐의 차이가 있고
// 행렬로 치면 행 단위로 값을 평가하는 것이 아닌 열 단위로 값을 평가한다.
