/*
 * @lc app=leetcode.cn id=1672 lang=javascript
 *
 * [1672] 最富有客户的资产总量
 */

// @lc code=start
/**
 * @param {number[][]} accounts
 * @return {number}
 */
var maximumWealth = function (accounts) {
  return accounts.reduce((acc, cur) => Math.max(acc, cur.reduce((a, b) => a + b)), 0);
};
const test = [
  [[[[1, 2, 3], [3, 2, 1]]], 6],
  [[[[1, 5], [7, 3], [3, 5]]], 10],
  [[[[2, 8, 7], [7, 1, 3], [1, 9, 5]]], 17],
].forEach(([items, expect]) => {
  const result = maximumWealth(...items);
  console.log(`结果：${result} ${result.toString() === expect.toString() ? '✅' : '❌'}`);
})
// @lc code=end

