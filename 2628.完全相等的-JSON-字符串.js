function isObject(o) {
  return Object.prototype.toString.call(o) === "[object Object]";
}

function isEq(o1, o2) {
  if (Array.isArray(o1)) {
    if (!Array.isArray(o2)) return false;
    if (o1.length !== o2.length) return false;
    return "isArr";
  }
  if (isObject(o1)) {
    if (!isObject(o2)) return false;
    const LEN1 = Object.keys(o1).length;
    const LEN2 = Object.keys(o2).length;
    if (LEN1 !== LEN2) return false;
    return "isObj";
  }
  return false;
}

function areDeeplyEqual(o1, o2) {
  const _isEq = isEq(o1, o2);
  if (_isEq) {
    if (_isEq === "isObj") {
      for (const key in o1) {
        if (isEq(o1[key], o2[key])) {
          const _areDeeplyEqual = areDeeplyEqual(o1[key], o2[key]);
          if (!_areDeeplyEqual) return false;
        } else {
          if (o1[key] != o2[key]) return false;
        }
      }
    }
    if (_isEq === "isArr") {
      for (let i = 0; i < o1.length; i++) {
        if (isEq(o1[i], o2[i])) {
          const _areDeeplyEqual = areDeeplyEqual(o1[i], o2[i]);
          if (!_areDeeplyEqual) return false;
        } else {
          if (o1[i] !== o2[i]) return false;
        }
      }
    }
  } else {
    if (o1 !== o2) return false;
  }
  return true;
}

const a = areDeeplyEqual({"x":1,"y":2}, {"x":1,"y":2});
console.log(`🚀 ~ a:`, a);
