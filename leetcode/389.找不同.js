/*
 * @lc app=leetcode.cn id=389 lang=javascript
 *
 * [389] 找不同
 */

// @lc code=start
/**
 * @param {string} s
 * @param {string} t
 * @return {character}
 */
var findTheDifference = function (s, t) {
  let res = 0;
  for (let i = 0; i < s.length; i++) {
    res ^= s.charCodeAt(i);
  }
  for (let i = 0; i < t.length; i++) {
    res ^= t.charCodeAt(i);
  }
  return String.fromCharCode(res);
};
const test = [
  [["abcd", "abcde"], "e"],
  [["", "y"], "y"],
].forEach(([items, expect]) => {
  const result = findTheDifference(...items);
  console.log(`结果：${result} ${result.toString() === expect.toString() ? '✅' : '❌'}`);
})
// @lc code=end

