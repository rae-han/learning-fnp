import {go, L, take, reduce, log, add } from '../fx.js'

const arr = [
  [1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [9, 10]
];

go(
  arr,
  L.flatten,
  L.filter(a => a % 2),
  L.map(a => a * a),
  take(4), // 4개만 꺼내면 되기 때문에 부분적으로만 배열을 꺼내온다.
  reduce(add),
  log
)