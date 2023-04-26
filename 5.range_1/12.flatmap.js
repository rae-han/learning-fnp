import {curry, flatten, go, L, log, map, pipe, range, take, takeAll} from '../fx.js'

// # flatmap
// map과 flatten을 동시에 하는 함수.
// 자바스크립트 스펙에는 flatmap이 있는데 이유는 자바스크립트가 기본적으로 지연적으로 동작하지 않기 때문에
// flatten이 있다면 L.map 후 flatten을 하면 어차피 동일한 시간 복잡도이기 때문에

const value = [[1, 2], [3, 4], [6, 7, 8]];

// flatten과 차이는 값을 평탄화 할 뿐 아니라 변화까지 줄수 있다.
log(value.flatMap(a => a));
log(value.flatMap(a => a.map(a => a * a)));
// 사실 map을 2번 한 값에 flatten을 한 것과 같다.
log(flatten(value.map(a => a.map(a => a * a))));

// flatmap이 있는 이유는 map과 flatten이 비효율 적으로 동작하기 때문이다.
// 뭐냐면 첫번째 map에서 새로운 배열을 만들게 하고 그렣게 모든 배열을 만든 후에 다시 한번 전체 순회 하면서 배열을 담는다.
// 2중 맵인걸 참고하면 된다.
// 그걸 한번에 하는 코드를 통해 좀 더 효율적으로 동작하게끔 해야한다.

// 하지만 참고로 위 코드 기준으로는 어차피 모든 것을 순회해야하기 때문에
// 바꾼다고해서 큰 효유을 보이진 않는다.

// 이미 flatten이 구현돼 있기 때문에 간단히 구현 가능하다.
L.flatMap = curry(pipe(
  L.map,
  L.flatten,
));

let it = L.flatMap(map(a =>  a * a), value)
// log(it.next());
// log(it.next());
// log(it.next());
// log(it.next());
log(...it)

const flatMap = curry(pipe(
  L.flatMap,
  takeAll,
))
log(1, flatMap(map(a => a * a), value))

const flatMap2 = pipe(
  L.map,
  L.flatten,
  takeAll
)
log(2, flatMap2(map(a => a * a), value))

const flatMap3 = pipe(
  L.map,
  flatten, // 즉시 평가 됨.
)
log(3, flatMap3(map(a => a * a), value))

// 실제로 조회 하는데만 사용하진 않고
log(flatMap(L.range, [1, 2, 3])); // [0, 0, 1, 0, 1, 2]
// 만약 그냥 map이라면??
log(map(range, [1, 2, 3])) // [ [ 0 ], [ 0, 1 ], [ 0, 1, 2 ] ]
// flatmap을 통해 펼칠수 있다.
log(flatMap(range, map(a => a + 1, [1, 2, 3]))); // [0, 1, 0, 1, 2, 0, 1, 2, 3]
log(...L.flatMap(L.range, map(a => a + 1, [1, 2, 3])));
log(flatMap(L.range, map(a => a + 1, [1, 2, 3])));
let it2 = L.flatMap(L.range, map(a => a + 1, [1, 2, 3]));
log(it2.next());
log(it2.next());
log(it2.next());
log(take(3,  L.flatMap(L.range, map(a => a + 1, [1, 2, 3])))) // 0 1 0

// yield*
// L.flatten = function* (iter) {
//   for (const a of iter) {
//     if (isIterable(a)) for (const b of a) yield b
//     else yield a;
//   }
// };
// yield*을 활용하면 위 코드를 아래와 같이 변경할 수 있습니다. yield* iterable은 for (const val of iterable) yield val; 과 같습니다.
//
// L.flatten = function* (iter) {
//   for (const a of iter) {
//     if (isIterable(a)) yield* a;
//     else yield a;
//   }
// };
// L.deepFlat
// 만일 깊은 Iterable을 모두 펼치고 싶다면 아래와 같이 L.deepFlat을 구현하여 사용할 수 있습니다. L.deepFlat은 깊은 Iterable을 펼쳐줍니다.
//
// L.deepFlat = function* f(iter) {
//   for (const a of iter) {
//     if (isIterable(a)) yield* f(a);
//     else yield a;
//   }
// };
// log([...L.deepFlat([1, [2, [3, 4], [[5]]]])]);
// // [1, 2, 3, 4, 5];


