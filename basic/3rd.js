const log = console.log

// # Array
const arr = [1, 2, 3];
log(arr[Symbol.iterator])
let iterator = arr[Symbol.iterator]();
// let iterable = arr[Symbol.iterator];
// let iterator = iterable(); // this에 대해서 생각해 볼 것.
iterator.next()
for (const item of iterator) log(item);
for (const item of arr) log(item);

// # Set
const set = new Set([1, 2, 3]);
for (const item of set) log(item);

// # Map
const map = new Map([['a', 1], ['b', 2], ['c', 3]]);
for (const item of map.keys()) log(item);
for (const item of map.values()) log(item);
for (const item of map.entries()) log(item);

let iter = map.values();
console.log('iter', iter[Symbol.iterator])
// 이터레이터인 iter가 또 Symbol.iterator를 가지고 있다.
// 그렇기 때문에 실행한 결과를 가지고 다시 for...of로 다시 순회를 할 수 있느 ㄴ것이다.

// 즉 심볼 이터레이터는 이터레이터를 리턴하는데 자기 자신을 가지고 있도록 되어있다.

/*
for 는 i를 리스트의 길이만큼 루프를 돌며 i라는 키로 접근하여 리스트를 순회한다면
for .. of 는 그렇지 않다.
왜냐면 set은 인덱스로 접근할 수 없다. (set[0], map[1])

즉 기존의 배열처럼 숫자로 된 키로 동작하는 것이 아닌 다른 방법으로 돌고 있다.
그 방법이 이터러블, 이터레이터 프로토콜을 따르고 있다.
 */

/*
## Symbol.iterator
Symbol은 어떤 객체의 키로 사용될 수 있다.
Array의 Symbol.iterator에는 어떤 함수가 들어있다고 나온다.

## 이터러블/이터레이터 프로토콜
- 이터러블: 이터레이터를 리턴하는 [Symbol.iterator]() 를 가진 값
- 이터레이터: { value, done } 객체를 리턴하는 next() 를 가진 값
- 이터러블/이터레이터 프로토콜: 이터러블을 for...of, 전개 연산자 등과 함께 동작하도록한 규약
 */

const arr2 = [1, 2, 3];
let iter2 = arr2[Symbol.iterator](); // 실행 안한 ()의 값도 알아 볼 것.
console.log('iter2', iter2)
let iter22 = iter2[Symbol.iterator]();
console.log('iter22', iter22)