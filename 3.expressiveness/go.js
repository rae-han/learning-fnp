import {go, log} from '../fx.js';

// const go = (...args) => reduce((value, func) => func(value), args);

go(
	0,
	(a) => a + 1,
	(a) => a + 10,
	(a) => a + 100,
	log,
);
// reduce를 이용하여 특정 리스트를 축약해나갊




