import { products } from './products.js';
import { log } from '../fx.js';

// # filter - 거르는 함수
let under20_000 = [];
for (const p of products) {
	if (p.price < 20_000) under20_000.push(p);
}
log(...under20_000);

let over20_000 = [];
for (const p of products) {
	if (p.price >= 20_000) over20_000.push(p);
}
log(...over20_000);

const filter = (func, iter) => {
	let res = [];

	for (const item of iter) {
		if (func(item)) {
			res.push(item);
		}
	}

	return res;
};

log(...filter((p) => p.price < 20_000, products));
log(...filter((p) => p.price >= 20_000, products));
