const log = console.log

// # Array
const arr = [1, 2, 3];
log(arr[Symbol.iterator])
let iter = arr[Symbol.iterator]();
for (const item of arr) log(item);
for (const item of iter) log(item);

// # Set
const set = new Set([1, 2, 3]);
for (const item of set) log(item);

// # Map
const map = new Map([['a', 1], ['b', 2], ['c', 3]]);
for (const item of map.keys()) log(item);
for (const item of map.values()) log(item);
for (const item of map.entries()) log(item);

/*
for 는 i를 리스트의 길이만큼 루프를 돌며 i라는 키로 접근하여 리스트를 순회한다면
for .. of 는 그렇지 않다.
왜냐면 set은 인덱스로 접근할 수 없다. (set[0], map[1])

즉 기존의 배열처럼 숫자로 된 키로 동작하는 것이 아닌 다른 방법으로 돌고 있다.
 */

/*
Symbol.iterator
Symbol은 어떤 객체의 키로 사용될 수 있다.
Array의 Symbol.iterator에는 어떤 함수가 들어있다고 나온다.
 */