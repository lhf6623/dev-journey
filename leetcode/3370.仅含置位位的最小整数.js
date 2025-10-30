/*
 * @lc app=leetcode.cn id=3370 lang=javascript
 *
 * [3370] 仅含置位位的最小整数
 */

// @lc code=start
/**
 * @param {number} n
 * @return {number}
 */
var smallestNumber = function (n) {

  return parseInt(n.toString(2).replace(/0/g, 1), 2)
};
const test = [
  [[5], 7],
  [[10], 15],
  [[3], 3],
].forEach(([items, expect]) => {
  const result = smallestNumber(...items);
  console.log(`结果：${result} ${result.toString() === expect.toString() ? '✅' : '❌'}`);
})
// @lc code=end

