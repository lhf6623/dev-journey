/*
 * @lc app=leetcode.cn id=205 lang=javascript
 *
 * [205] 同构字符串
 */

// @lc code=start
/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isIsomorphic = function (s, t) {
  const map1 = new Map();
  for (let i = 0; i < s.length; i++) {
    if (map1.has(s[i])) {
      if (map1.get(s[i]) !== t[i]) {
        return false;
      }
    } else {
      map1.set(s[i], t[i]);
    }
  }
  map1.clear()
  for (let i = 0; i < t.length; i++) {
    if (map1.has(t[i])) {
      if (map1.get(t[i]) !== s[i]) {
        return false;
      }
    } else {
      map1.set(t[i], s[i]);
    }
  }
  return true;
};
const test = [
  [["badc", "baba"], false],
  [["egg", "add"], true],
  [["foo", "bar"], false],
  [["paper", "title"], true]
].forEach(([items, expect]) => {
  const result = isIsomorphic(...items);
  console.log(`结果：${result} ${result.toString() === expect.toString() ? '✅' : '❌'}`);
})
// @lc code=end

