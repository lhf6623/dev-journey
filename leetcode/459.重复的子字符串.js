/*
 * @lc app=leetcode.cn id=459 lang=javascript
 *
 * [459] 重复的子字符串
 */

// @lc code=start
/**
 * @param {string} s
 * @return {boolean}
 */
var repeatedSubstringPattern = function (s) {
  const n = s.length;
  for (let i = 1; i <= n / 2; i++) {
    if (n % i === 0 && s.slice(0, i).repeat(n / i) === s) {
      return true;
    }
  }
  return false;
};
const test = [
  [["abab"], true],
  [["aba"], false],
  [["abcabcabcabc"], true]
].forEach(([items, expect]) => {
  const result = repeatedSubstringPattern(...items);
  console.log(`结果：${result} ${result.toString() === expect.toString() ? '✅' : '❌'}`);
})
// @lc code=end

