/*
 * @lc app=leetcode.cn id=1374 lang=javascript
 *
 * [1374] 生成每种字符都是奇数个的字符串
 */

// @lc code=start
/**
 * @param {number} n
 * @return {string}
 */
var generateTheString = function (n) {
  return n % 2 === 0 ? "a".repeat(n - 1) + "b" : "a".repeat(n);
};
const test = [
  [[4], "aaab"],
  [[2], "ab"],
  [[7], "aaaaaaa"],
].forEach(([items, expect]) => {
  const result = generateTheString(...items);
  console.log(`结果：${result} ${result.toString() === expect.toString() ? '✅' : '❌'}`);
})
// @lc code=end

