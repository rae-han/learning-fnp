const log = console.log

// # 제너레이터/이터레이터
// - 제너레이터: 이터레이터이자 이터러블을 생성하는 함수
// 제너레이터는 순회할 값을 문장으로 표현하는 것이다 라고도 표현할 수 있다.

let isSecond = false;
function* generator() {
  yield 1;
  if (isSecond) yield 2;
  yield 3;
  return 100;
  // 리턴 값도 만들수 있는데 마지막에 done이 true가 되면서 이 값이 반환된다.
  // 유의해야 할 점은 순회할 때 리턴 값은 없이 순회가 이뤄진다.
}

let iter = generator();
log(iter[Symbol.iterator]() === iter);
log(iter.next());
log(iter.next());
log(iter.next());
log(iter.next());

for (const a of generator()) log(a);

// 이터러블이면 순회할 수 있다.
// 제너레이터는 문장을 값으로 만들 수 있고, 문장을 통해서 순회할 수 있는 값을 만들수 있기 때문에 자바스크립트에서는 제너레이터를 통해서 어떤 값이든 순회할 수 있게 만들수 있다.


// 예제 1.
// function *odds(l) {
//   for (let i = 0; i < l; i++) {
//     if(i % 2)  yield i;
//   }
// }


// 예제 2.
// function *infinity(i = 0) {
//   while (true) yield i++;
// }
// function *odds(l) {
//   for (const i of infinity(1)) {
//     if (i % 2) yield i;
//     if (i === l) return;
//   }
// }

// 예제 3.
function* infinity(i = 0) {
  while (true) yield i++;
}

function* limit(l, iter) {
  for (const a of iter) {
    yield a;
    if (a === l) return;
  }
}

function* odds(l) {
  for (const a of limit(l, infinity(1))) {
    if (a % 2) yield a;
  }
}

let iter2 = odds(10);
log(iter2.next());
log(iter2.next());
log(iter2.next());
log(iter2.next());
log(iter2.next());
log(iter2.next());
log(iter2.next());

for (const a of odds(40)) log(a);

// # for of, 전개 연산자, 구조 분해, 나머지 연산자

log('example 1');
log(...odds(10));
log([...odds(10), ...odds(20)]);

log('example 2');
const [head, ...tail] = odds(5);
log(head);
log(tail);

log('example 3');
const [a, b, ...rest] = odds(10);
log(a);
log(b);
log(rest);