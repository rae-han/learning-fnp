const log = console.log

const iterable = {
  [Symbol.iterator]() {
    let i = 6;
    return {
      next() {
        return i === 0 ? {done: true} : {value: i--, done: false};
      },
      [Symbol.iterator]() {
        console.log(this)
        return this;
      }
    }
  }
}

let iterator = iterable[Symbol.iterator]();
iterator.next();
iterator.next();
log(iterator.next());
log(iterator.next());
for (const a of iterator) log(a);
// 만약 안쪽에 this를 리턴하는 [Symbol.iterator]() {...} 가 없다면 위의 const .. of iter 가 실행이 안된다.
// 잘 구현된 이터레이터(배열)은 next() 중에 다시 반복을 해도 작동을 해야한다ㅏ.
// [Symbol.iterator]를 실행 했을때 바ㅣㄴ환된 iterator가 자기 자신 또한 이터러블이면서 [Symbol.iterator]를 실행하더라도 자기 자신의 값을 기억해서 실행되도록 해야한다.
// 즉 iterable도 iterator 도 순회가 되도록 해야한다.

// 순회가 가능한 값을 가진 대부분의 값들은 이 프로토콜을 따르도록 구현돼 있다.
// 각종 오픈소스도 마찮가지.
// WebAPIs도 마찬가지. dom과 관련된 것들도 이 이터러블 이터레이터를 따르고 있다.

// for (const a of document.querySelectorAll('*')) log(a);
// const all = document.querySelectorAll('*');
// let iter3 = all[Symbol.iterator]();
// log(iter3.next());
// log(iter3.next());
// log(iter3.next());

console.clear();

const arr = [1, 2, 3];
const set = new Set([1, 2, 3]);
const map = new Map([['a', 1], ['b', 2], ['c', 3]]);

const a = [1, 2];
// a[Symbol.iterator] = null;
log([...a, ...arr, ...set, ...map.entries()]);

