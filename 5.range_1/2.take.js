import {add, curry, go, L, take, log, range, reduce} from '../fx.js'

// # take
// 인자를 2개 받는데 limit과 iterable를 받는다.
// 순회를 하는데 limit 갯수만큼 리턴 값이 채워지면 리턴해준다.

// const take = curry((l, iter) => {
//   let res = [];
//   for (const a of iter) {
//     res.push(a);
//     if (res.length === l) return res;
//   }
//   return res;
// });

log(take(5, range(100)));
// take는 이터러블을 따르고 순회하여 푸쉬하는 단순한 로직을 따르고 있다.
// 이터러블을 따르고 있기 때문에 L.range도?
log(take(5, L.range(100)));

// 전혀 다른 함수가 이터러블을 따른다면 소통 가능하여 조합성이 높고 잘 구성할수 있다.

// 특히 만약 숫자가 100000 이라면 5개만 만들면 되는데 전자는 100000개를 만드는 반면 후자는 5개가 채워지면 그만 만든다.
// 그리고 후자는 100000이 아니라 무한 수열을 사용해도 되낟.
log(take(5, L.range(Infinity)))

// 조합성이 높기 때문에 go와 조합하여
// 보기 좋게 만들수 있다.
console.time();
go(
  range(10000),
  take(5),
  reduce(add),
  log,
)
console.timeEnd();
console.time();
go(
  L.range(10000),
  take(5),
  reduce(add),
  log,
)
console.timeEnd();
// 또한 지연성을 사용하면 위 같은 경우처럼 take나 reduce 같은 함수를 만날때 실행시켜 효율적으로 만들 수 있다.
// 연산이 필요한 값이 필요할때까지 미루다가 연산이 필요할 때 연산을 하는 기법


