import {add, filter, go, log, map, pipe, reduce} from "../fx.js";
import {products} from "../methods/products.js";

// # curry는 함수를 값으로 다루면서
// 받아둔 함수를 내가 원하는 시점에 평가시키는 함수
// 우선 함수를 받아서 함수를 리턴하고 인자를 받아서 원하는 갯수만큼의 인자가 들어 왔을 때 받아두었던 함수를 나중에 평가시키는 함수

const curry = func => (a, ..._) => _.length ? func(a, ..._) : (..._) => func(a, ..._)
// length가 있다면 받아둔 함수를 즉시 실행하고
// 아니라면 함수를 리턴하여 그 이후에 들어올 값을 받아보고 받아서 그때 함수를 실행하는 함수 // 미리 받은 a와

// 간단히 함수를 받아 함수를 리턴하는데 그렇게 받은 함수가 실행 되었을 때 인자가 두개 이상이면 즉시 실행하고, 두개보다 작다면 함수를 리턴한 후에 그 후에 들어온 인자를 합쳐서 실행하는 함수

const mult = curry((a, b) => a * b);

log(mult(1)); // Function
log(mult(1)(2)); // 2

const mult10 = mult(10);

log(mult10(1))
log(mult10(2))
log(mult10(3))

// 이 거키를 그 전에 만들어둔 map, filter, reduce에 적용을 해준다면?
// 함수들이 인자를 하나만 받으면 이 후 인자들을 받기로 기다리는 함수로 돼 있다.

go(
  products,
  products => filter(p => p.price < 20000, products),
  products => map(p => p.price, products),
  prices => reduce(add, prices),
  log
);

go(
  products,
  products => filter(p => p.price < 20000)(products),
  // 프로덕트를 받아 그대로 실행시킨단 말은
  // filter(p => p.price < 20000) 가 그냥 전체 함수로 와도 된다는 말.
  products => map(p => p.price)(products),
  prices => reduce(add)(prices),
  log
);

go(
  products,
  filter(p => p.price < 20000),
  map(p => p.price),
  reduce(add),
  log
);

// # 함수 조합으로 함수 만들기
console.log('#### 1111');
go(
  products,
  filter(p => p.price < 20000),
  map(p => p.price),
  reduce(add),
  log
);

go(
  products,
  filter(p => p.price >= 20000),
  map(p => p.price),
  reduce(add),
  log
);

// 위 코드에서 map ~ reduce 부분이 중복된다.
console.log('#### 2222');
const total_price = pipe(
  map(p => p.price),
  reduce(add)
)

go(
  products,
  filter(p => p.price < 20000),
  total_price,
  log
);

go(
  products,
  filter(p => p.price >= 20000),
  total_price,
  log
);

console.log('#### 3333');
const base_total_price = predi => pipe(
  filter(predi),
  total_price,
)

go(
  products,
  base_total_price(p => p.price < 20000),
  log
);

go(
  products,
  base_total_price(p => p.price >= 20000),
  log
);