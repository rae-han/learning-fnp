const log = console.log;

/*
실무에서 리스트 순회는 매우 중요하다. 함수형에서는 더욱 중요하다.
- for i++
- for of
 */

const list = [1, 2, 3];
for (var i = 0; i < list.length; i++) {
	log(list[i]);
}
for (var i = 0; i < str.length; i++) {
	log(str[i]);
}

const str = 'abc';
for (const a of list) {
	log(a);
}
for (const a of str) {
	log(a);
}
