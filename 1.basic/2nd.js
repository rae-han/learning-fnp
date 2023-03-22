const log = console.log;

/*
실무에서 리스트 순회는 매우 중요하다. 함수형에서는 더욱 중요하다.
- for i++ - 어떻게 순회를 하는지 명령을 한다.
- for of - 어떻게 순회를 하는지 선언을 한다.
	- 이게 개발자에게 어떤 규약을 열어주고, 어떻게 순회에 대해 추상화를 했고, 어떻게 사용하게 됐는지에 대해서 알아봐야 한다.
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

