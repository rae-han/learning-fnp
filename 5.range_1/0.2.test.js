import { curry, pipe } from "../fx.js";

const add = (a, b) => {
  console.log(11, a);
  console.log(22, b);
  return a + b;
}

const _add = curry(add);

const result = curry(pipe(
  _add,
  _add(10),
  _add(20),
))

console.log(result(1, 2))