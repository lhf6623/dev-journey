/*
 * @lc app=leetcode.cn id=541 lang=javascript
 *
 * [541] 反转字符串 II
 */

// @lc code=start
/**
 * @param {string} s
 * @param {number} k
 * @return {string}
 */
var reverseStr = function (s, k) {
  const n = s.length;
  const res = [];
  for (let i = 0; i < n; i += 2 * k) {
    res.push(s.slice(i, i + k).split('').reverse().join(''));
    res.push(s.slice(i + k, i + 2 * k));
  }
  return res.join('');
};
const test = [
  [["abcdefg", 2], "bacdfeg"],
  [["abcd", 2], "bacd"],
].forEach(([items, expect]) => {
  const result = reverseStr(...items);
  console.log(`结果：${result} ${result.toString() === expect.toString() ? '✅' : '❌'}`);
})
// @lc code=end

