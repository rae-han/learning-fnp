import {curry, L, log, map, pipe, reduce} from "../fx.js";

// Array에 있는 join 함수는 Array.prototype에만 붙어있다.
// 함수형의 reduce는 이터러블을 순회 가능하기 때문에 더 다형성이 높다.

// 세퍼레이터 === sep
const join = curry((sep = ',', iter) => reduce((a, b) => `${a}${sep}${b}`, iter));

const obj = {
  limit: 10, offset: 10, type: 'notice'
}

const queryStr = pipe(
  Object.entries,
  map(([k, v]) => `${k}=${v}`),
  // reduce((acc, cur) => `${acc}&${cur}`),
  join('&'),
  // 파이프 사이사이에 이쓴ㄴ 함수를 꺼내서(reduce를 join으로 만듦)
  // 조합성과 재사용성이 높게 프로그래밍 할수 있다.
  log
)

queryStr(obj);

// Array.prototype.join 은 배열이여야만 사용 가능하지만
// 지금 만든 join은 배열은 아닌 것도 사용 가능하다.

// 이터러블 프로토콜을 따른다는 이야기는
// join으로 가는 과정을 지연할수 있다는 것이다.
// map이 아니라 L.map을 사용할 수 있다.
// entries로 지연 시킬수 있다.

log(join(',', 'abcdefghijklmnopqrstuvwxyz'))

const queryStr1 = pipe(
  Object.entries,
  map(([k, v]) => `${k}=${v}`),
  function(a) {
    log(a)
    return a;
  },
  join('&'),
)

const queryStr2 = pipe(
  Object.entries,
  L.map(([k, v]) => `${k}=${v}`),
  function(a) {
    log(a)
    return a;
  },
  join('&'),
)

log('#### 1')
queryStr1(obj)
queryStr2(obj)

L.entries = function *(obj) {
  for (const k in obj) yield [k, obj[k]];
};

const queryStr3 = pipe(
  L.entries,
  L.map(([k, v]) => `${k}=${v}`),
  join('&'),
  log,
)

queryStr3(obj)
