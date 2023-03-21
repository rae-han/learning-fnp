import { products } from './products.js';
import { log } from '../fx.js';

// # reduce - 값을 축약하는 함수
// 이터러블 값을 하나의 값으로 축약해 나가는 것

const nums = [1, 2, 3, 4, 5];

// 명령형
let total = 0;
for (const n of nums) {
	total += n;
}
log(total);

// reduce의 외부 인터페이스
// const reduce = () => {};
//
const add = (a, b) => a + b;
// log(reduce(add, 0, nums));
// // 내부적으로
// // 초기값 0부터 시작을 해서
// // log(add(add(add(add(add(0, 1), 2), 3), 4), 5)); // 15
// // 보조 함수를 연속적, 재귀적으로 실행하면서 하나의 값으로 누적해 나간다.

const reduce1 = (func, acc, iter) => {
	for (const item of iter) {
		acc = func(acc, item);
	}

	return acc;
};

log(reduce1(add, 0, nums));

// 시작하는 값 acc 를 생략하는 방법
const reduce2 = (func, acc, iter) => {
	if (!iter) {
		iter = acc[Symbol.iterator]();
		acc = iter.next().value;
	}

	for (const item of iter) {
		acc = func(acc, item);
	}

	return acc;
};

log(reduce2(add, nums));

// reduce 같은 경우 보조함수를 통해 어떻게 축약할지 완전히 위임하기 때문에
// 단순 숫자 뿐 아니라 복잡한 데이터를 축약해 나가는데 잇어서 문제 없다.

import { reduce } from '../fx.js';
log(reduce((total_price, product) => total_price + product.price, 0, products));

// reduce 같은 경우에도 보조함수를 통해 안쪽에 있는 값의 다형성을 잘 지원해주고
// 이터러블을 통해 외부에 대한 값(products)도 더 잘 지원하는 리듀서 함수이다.

const myReducer = (func, acc, iter) => {
	if (!iter) {
		const it = acc[Symbol.iterator]();
		acc = it.next().value;

		iter = it;
	}

	for (const item of iter) {
		acc = func(acc, item);
	}

	return acc;
};

log(
	5,
	myReducer((pre, cur) => pre + cur.price, products),
);
