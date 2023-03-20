import { products } from './products.js';
import { map, filter, reduce, log } from '../fx.js';

// 가격을 뽑아보자.
map((p) => p.price, products);
// 특정 금액 이하의 상품만 뽑고 싶다.
// map이 받는 products를 축약해주면 된다.
map(
	(p) => p.price,
	filter((p) => p.price < 20_000, products),
);
// 가격을 합치고 싶다면?
const add = (a, b) => a + b;
log(
	reduce(
		add,
		map(
			(p) => p.price,
			filter((p) => p.price < 20_000, products),
		),
	),
);
// 중첩돼서 복잡해보이지만 오른쪽부터 읽어나가면 된다.
// map을 먼저 하고 filter를 해도 된다.
log(
	reduce(
		add,
		filter(
			(n) => n < 20_000,
			map((p) => p.price, products),
		),
	),
);

// products를 통해 add를 하고 싶으면
// reduce, add 까지는 별 생각 없이 작성하고
// 즉 그 다음 값이 숫자로 돼 있는 배열이 들어올 것이라 생각하고 작성을 하고
// 그 자리의 코드가 평가 됐을때 숫자가 들어있는 배열이 나오도록 작성하면 된다.
// 함수형에서는 이런 식으로 사고를 하며 코드를 진행해 나간다.
