/*
 * @lc app=leetcode.cn id=1716 lang=javascript
 *
 * [1716] 计算力扣银行的钱
 */

// @lc code=start
/**
 * @param {number} n
 * @return {number}
 */
var totalMoney = function (n) {

  return Array.from({ length: n }, (_, i) => Math.floor(i / 7) + (i % 7 + 1)).reduce((a, b) => a + b)
};
const test = [
  [[4], 10],
  [[10], 37],
  [[20], 96],
].forEach(([items, expect]) => {
  const result = totalMoney(...items);
  console.log(`结果：${result} ${result.toString() === expect.toString() ? '✅' : '❌'}`);
})
// @lc code=end

