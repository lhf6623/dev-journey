/*
 * @lc app=leetcode.cn id=268 lang=javascript
 *
 * [268] 丢失的数字
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var missingNumber = function(nums) {
  // 总和不变
  let num = 0
  let i
  for (i = 0; i < nums.length; i++) {
    num += nums[i]-i;
  }
  num -= i
  return Math.abs(num)
};
// @lc code=end

