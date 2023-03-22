import { products } from './products.js';
const log = console.log;

// # map 수집 하는 함수

let names = [];
for (const p of products) {
	names.push(p.name);
}
log(names);

let prices = [];
for (const p of products) {
	prices.push(p.name);
}
log(prices);

// const map = (func, iter) => {
// 	let res = [];
//
// 	for (const item of iter) {
// 		res.push(func(item));
// 		// 어떤 값을 수집할 것인지 func 함수에 위임 함으로 추상화 한다.
// 	}
//
// 	return res; // 함수는 인자 값과 반환 값으로 대화한다.
// };
import { map } from '../fx.js';

log(map((p) => p.name, products));
log(map((p) => p.price, products));
// 함수형 프로그래밍에서는 map이라는 함수에 보조함수를 통해서 products배열 혹은 이터러블 안에 있는 어떤 값을 수집하겠다 보조함수를 전달하는 식으로 값을 다룬다.

// ## 이터러블 프로토콜을 따른 map의 다형성
// dom 객체 같은 경우 이터러블이지만 배열이 아닌 유사배열이므로 빌트인 map 함수로 반복할 수 없다.
// 점점 이터러블 프로토콜을 따르는 방향으로 나아갈 것이므로 프로토타입 기반, 클래스 기반으로 값을 사용하는 기법보다 유연하고 다형성이 높다고 볼 수 있다.

function* gen() {
	yield 2;
	yield 3;
	yield 4;
}

log(map((a) => a * a, gen()));
// 이런 문장도 map을 사용할 수 있다.
// 사실상 모든 것을 map을 할 수 있다.

const m = new Map();
m.set('a', 10);
m.set('b', 20);

const it = m[Symbol.iterator]();

log(new Map(map(([k, a]) => [k, a * 2], m))); // map 함수를 통해 새로운 map 객체를 만들었다.
