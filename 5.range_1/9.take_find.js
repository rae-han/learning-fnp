import { curry, filter, go, L, log, take } from '../fx.js';

// - 앞서 join은 reduce를 이용하여 만들었기 때문에 reduce 계열 함수
// 함수형 프로그래밍은 이런 식으로 계열, 계보가 있다.
// find는 take로 만들수 있다.

// queryStr 도 결국 reduce 계열인 join으로 마무리 했기 때문에
// reduce 계열 함수이다.

// find 는 take를 이용한다.

const users = [
  {age: 32},
  {age: 31},
  {age: 37},
  {age: 28},
  {age: 25},
  {age: 32},
  {age: 31},
  {age: 37}
];

const find1 = (fn, iter) => go(
  iter,
  filter(fn),
  take(1), // 하나만 꺼내도록.
  ([a]) => a, // 배열을 깨서 값이 나가도록.
)
// 하나의 결과만 꺼내면 되는데 모두 순회해야하는 아쉬운 점이 있다.
// 효율적이지 못한 상태

log(find1(u => u.age < 30, users));

// L만 붙여도
// take가 하나씩 꺼내보며 1개 찾을수 있는 때가 오면 그만하고 결과를 반환한다.
// take에게 결과를 미뤄서 연산을 미뤄서 대신해서 값이 꺼내지면 더 이상 필터를 하지 않도록 미뤄주면
// 효율적인 코딩이 가능하다.
const find2 = (fn, iter) => go(
  iter,
  L.filter(a => (log(1, a), fn(a))),
  a => (log(2, a), a),
  take(1),
  ([a]) => a,
)
// 이해하기가 편하다
// 이터러블을 받아서
// 필터를 하다가
// 1개를 찾으면
// 구조분해해서 꺼내준다. 라 해석할수 있다.


log(find2(u => u.age < 30, users));

const find = curry((fn, iter) => go(
  iter,
  L.filter(fn),
  take(1),
  ([a]) => a,
))

go(
  users,
  // map(u => u.age), // find가 먼저 받는 값이 iterable이기 때문에 연산을 완료한 값을 줘도 사용 가능하고, 결과를 미뤄놓은 채로 줘도 연산을 하면서 결과를 만들수 있다.
  L.map(u => u.age),
  find(n => n < 30), // 파인드를 이런 식으로도 가
  log,
)



