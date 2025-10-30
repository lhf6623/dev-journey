/*
 * @lc app=leetcode.cn id=1929 lang=javascript
 *
 * [1929] 数组串联
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var getConcatenation = function (nums) {
  nums.push(...nums)
  return nums
};
const test = [
  [[[1, 2, 1]], [1, 2, 1, 1, 2, 1]],
  [[[1, 3, 2, 1]], [1, 3, 2, 1, 1, 3, 2, 1]],
].forEach(([items, expect]) => {
  const result = getConcatenation(...items);
  console.log(`结果：${result} ${result.toString() === expect.toString() ? '✅' : '❌'}`);
})
// @lc code=end

