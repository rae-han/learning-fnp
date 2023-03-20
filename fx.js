export const log = console.log;

export const map = (func, iter) => {
	let res = [];

	for (const item of iter) {
		res.push(func(item));
		// 어떤 값을 수집할 것인지 func 함수에 위임 함으로 추상화 한다.
	}

	return res; // 함수는 인자 값과 반환 값으로 대화한다.
};

export const filter = (func, iter) => {
	let res = [];

	for (const item of iter) {
		if (func(item)) {
			res.push(item);
		}
	}

	return res;
};

export const reduce = (func, acc, iter) => {
	if (!iter) {
		iter = acc[Symbol.iterator]();
		acc = iter.next().value;
	}

	for (const item of iter) {
		acc = func(acc, item);
	}

	return acc;
};
