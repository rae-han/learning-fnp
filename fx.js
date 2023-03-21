export const log = console.log;

export const add = (a, b) => a + b;

export const curry = func => (a, ..._) => _.length ? func(a, ..._) : (..._) => func(a, ..._)

export const _map = (func, iter) => {
	let res = [];

	for (const item of iter) {
		res.push(func(item));
		// 어떤 값을 수집할 것인지 func 함수에 위임 함으로 추상화 한다.
	}

	return res; // 함수는 인자 값과 반환 값으로 대화한다.
};

export const map = curry(_map);

export const _filter = (func, iter) => {
	let res = [];

	for (const item of iter) {
		if (func(item)) {
			res.push(item);
		}
	}

	return res;
};
export const filter = curry(_filter);

export const _reduce = (func, acc, iter) => {
	if (!iter) {
		iter = acc[Symbol.iterator]();
		acc = iter.next().value;
	}

	for (const item of iter) {
		acc = func(acc, item);
	}

	return acc;
};
export const reduce = curry(_reduce);

export const go = (...args) => reduce((arg, func) => func(arg), args);

export const pipe1 = (...fs) => (arg) => go(arg, ...fs)
export const pipe2 = (func, ...fs) => (...args) => go(func(...args), ...fs)

export const pipe = (func, ...fs) => (...args) => go(func(...args), ...fs)