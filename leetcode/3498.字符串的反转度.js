/*
 * @lc app=leetcode.cn id=3498 lang=javascript
 *
 * [3498] 字符串的反转度
 */

// @lc code=start
/**
 * @param {string} s
 * @return {number}
 */
var reverseDegree = function (s) {
  return s.split('').reduce((acc, cur, index) => {
    return acc + (123 - cur.charCodeAt()) * (index + 1);
  }, 0)
};
const test = [
  [["abc"], 148],
  [["zaza"], 160],
].forEach(([items, expect]) => {
  const result = reverseDegree(...items);
  console.log(`结果：${result} ${result.toString() === expect.toString() ? '✅' : '❌'}`);
})
// @lc code=end

