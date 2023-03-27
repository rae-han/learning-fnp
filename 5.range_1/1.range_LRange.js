import {add, log, range, reduce} from '../fx.js'
const L = {};

// range - 숫자를 받아 숫자의 크기 만큼 배열을 리턴하는 함수
// range(5) => [0, 1, 2, 3, 4]

// const range = len => {
//   let i = -1;
//   let res = [];
//
//   while(++i < len) {
//     res.push(i)
//   }
//
//   return res;
// }

log(range(5));
log(range(8));

let list1 = range(6);
log(1, list1)
log(2, reduce(add, list1))

// # L.range 느긋한 range
L.range = function* (len) {
  let i = -1;

  while(++i < len) {
    yield i;
  }
}

let list2 = L.range(6);
log(3, list2)
log(4, reduce(add, list2))

// L.range는 내부의 값을 처음 순회할 때 즉 next()가 호출 될 때 실행 된다.
// 그 전에는 실행되지 않는다.
// 즉 값이 필요할 때, 실제로 순회할 때, 사용자가 필요한 값이 있을 때
// 처음부터 배열 형태로 있는 것이 아닌, 필요할때까지 기다렸다가 평가가 이뤄져서 값을 꺼내가 된다.

// 즉 첫번재는 처음부터 어레이로 만들 전달이 되고 동작을 하는 반면
// L은 값을 만들지 않고 값을 하나씩 꺼내서 사용한다.

// 생략 된 것이 for ... of iter 를 할 때 이터레이터를 만든다.
// reduce의 for ... of iter 에서 iter[Symbol.iterator]() 가 돼 이터레이터를 만드는 것

// ## 효율성 Test
// ## 사실 아주 큰 성능상의 차이는 보이지 않는다.

const test = (name, time, fn) => {
  console.time(name);
  while (time--) fn();
  console.timeEnd(name)
}

test('range', 10, () => reduce(add, range(1_000_000)))
test('L.range', 10, () => reduce(add, L.range(1_000_000)))
