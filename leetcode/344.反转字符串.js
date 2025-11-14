/*
 * @lc app=leetcode.cn id=344 lang=javascript
 *
 * [344] 反转字符串
 */

// @lc code=start
/**
 * @param {character[]} s
 * @return {void} Do not return anything, modify s in-place instead.
 */
var reverseString = function (s) {
  for (let i = 0, j = s.length - 1; i < j; i++, j--) {
    [s[i], s[j]] = [s[j], s[i]];
  }
  return s;
};
const test = [
  [[["h", "e", "l", "l", "o"]], ["o", "l", "l", "e", "h"]],
  [[["H", "a", "n", "n", "a", "h"]], ["h", "a", "n", "n", "a", "H"]],
].forEach(([items, expect]) => {
  const result = reverseString(...items);
  console.log(`结果：${result} ${result.toString() === expect.toString() ? '✅' : '❌'}`);
})
// @lc code=end

