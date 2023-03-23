// pipe1 같은 경우에는??
import {add, filter, go, log, map, reduce} from "../fx.js";
import {products} from "../2.methods/products.js";

// pipe는 함수를 리턴하는 함수로
// go에 있는 함수를 축약한 함수이다.

const pipe1 = (...fs) => (arg) => go(arg, ...fs)

// pip에 기능을 조금 추가하자면
// go 같은 경우 시작하는 인자가 두개일 때 하나로 평가해서 시작할 수 있다.

go(
  add(0, 1),
  a => a + 1,
  a => a + 10,
  a => a + 100,
  log
)


const f1 = pipe1(
  a => a + 1,
  a => a + 10,
  a => a + 100,
)
log(2, f1(add(0, 1))); // <- 이 부분에서 연산을 하는 것이 아쉽다.

const f2 = pipe1(
  (a, b) => a + b, // 이렇게 만들 방법은 없을까??
  a => a + 1,
  a => a + 10,
  a => a + 100,
)
log(3, f2(0));

// 앞에 거 하나를 꺼내자.
const pipe2 = (func, ...fs) => (...args) => go(func(...args), ...fs)
const f3 = pipe2(
  (a, b = a) => a + b,
  a => a + 1,
  a => a + 10,
  a => a + 100,
)
log(4, f3(1));
log(5, f3(1, 2));

// 위 코드들을 통해서 함수를 위아래 아래로, 왼쪽에서 오른쪽으로 실행되도록 표현을 바꿨다.
log(
  reduce(
    add,
    map(p => p.price,
      filter(p => p.price < 20000, products)
    )
  )
);

go(
  products,
  products => filter(p => p.price < 20000, products),
  products => map(p => p.price, products),
  prices => reduce(add, prices),
  log
);
// 코드 양도 많아지고 간결하지 않지만... 읽기는 편해졌다.