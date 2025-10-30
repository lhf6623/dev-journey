/*
 * @lc app=leetcode.cn id=3264 lang=javascript
 *
 * [3264] K 次乘运算后的最终数组 I
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} k
 * @param {number} multiplier
 * @return {number[]}
 */
var getFinalState = function (nums, k, multiplier) {
  while (k) {
    const min = Math.min(...nums);
    const index = nums.indexOf(min);
    nums[index] = min * multiplier;
    k--;
  }
  return nums;
};
const test = [
  [[[2, 1, 3, 5, 6], 5, 2], [8, 4, 6, 5, 6]],
  [[[1, 2], 3, 4], [16, 8]],
].forEach(([items, expect]) => {
  const result = getFinalState(...items);
  console.log(`结果：${result} ${result.toString() === expect.toString() ? '✅' : '❌'}`);
})
// @lc code=end

