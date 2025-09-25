/*
 * @lc app=leetcode.cn id=628 lang=javascript
 *
 * [628] 三个数的最大乘积
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var maximumProduct = function (nums) {
  nums.sort((a, b) => a - b);
  let res2 = nums[0] * nums[1] * nums.at(-1);
  let res3 = nums.at(-1) * nums.at(-2) * nums.at(-3);
  return Math.max(res2, res3);
};

console.log(maximumProduct([-1, -2, -3, -4]));

// @lc code=end
