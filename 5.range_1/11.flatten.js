import { curry, go, L, log, pipe, take, takeAll } from '../fx.js'

// flatten
// 배열을 다 펼쳐서 하나의 배열로 만들기 위한 함수.
// L.flatten은 그걸 지연해서 하는 함수.

const isIterable = a => a && a[Symbol.iterator];
// 간단하게 Symbol iterable이 있는지 확인. && 앞은 nullable 값인지 확인

L.flatten = function* (iter) {
  for (const a of iter) {
    if (isIterable(a)) { // 이터러블이면 추가 작업 해주고 아니면 반환
      for (const b  of a) yield b;
    } else {
      yield a;
    }
  }
}

const it = L.flatten([[1, 2], 3, 4, [5, 6, 7], 8]);
log(it.next())
log(it.next())
log(...it); // 이터레이터므로 한번에 펼쳐 줄 수 있ㄷ.

// L.flatten이 있으면 즉시 평가하는 flatten도 쉽게 만들 수 있다.

const flatten = pipe(
  L.flatten,
  takeAll,
  log
)

flatten([[1, 2], 3, 4, [5, 6, 7], 8])

// 추가로 L.flatten 은 지연동작 하기 때문에 아래와 같이도 사용 가능하다.
log(take(3, L.flatten([[1, 2], 3, 4, [5, 6, 7], 8])))