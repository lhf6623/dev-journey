/*
 * @lc app=leetcode.cn id=3502 lang=javascript
 *
 * [3502] 到达每个位置的最小费用
 */

// @lc code=start
/**
 * @param {number[]} cost
 * @return {number[]}
 */
var minCosts = function (cost) {
  let min = Infinity;
  return cost.map(item => min = Math.min(item, min))
};
const test = [
  [[[5, 3, 4, 1, 3, 2]], [5, 3, 3, 1, 1, 1]],
  [[[1, 2, 4, 6, 7]], [1, 1, 1, 1, 1]],
]
test.forEach(([items, expect]) => {
  const result = minCosts(...items);
  console.log(`结果：${result} ${result.toString() === expect.toString() ? '✅' : '❌'}`);
})
// @lc code=end

