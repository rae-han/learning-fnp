import { go, log, map, pipe, reduce } from '../fx.js';

const obj = {
  limit: 10, offset: 10, type: 'notice'
}

const queryStr1 = obj => go(
  obj,
  Object.entries,
  map(([k, v]) => `${k}=${v}`),
  reduce((acc, cur) => `${acc}&${cur}`),
  log
)
queryStr1(obj)

const queryStr = pipe(
  Object.entries,
  map(([k, v]) => `${k}=${v}`),
  reduce((acc, cur) => `${acc}&${cur}`),
)

log(queryStr(obj));
