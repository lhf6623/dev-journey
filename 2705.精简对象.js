// 2705.精简对象.js

/**
 * @param {Object|Array} obj
 * @return {Object|Array}
 */
var compactObject = function (obj) {

  if (Array.isArray(obj)) {
    return obj.filter(Boolean).map(compactObject)
  } else if (typeof obj === 'object') {
    return Object.fromEntries(Object.entries(obj).filter(([k, v]) => Boolean(v)).map(([k, v]) => [k, compactObject(v)]))
  }
  return obj
};

const obj = [null, 0, [null, 1], {}, false, 1]

console.log(compactObject(obj))