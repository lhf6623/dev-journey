/*
 * @lc app=leetcode.cn id=2239 lang=javascript
 *
 * [2239] 找到最接近 0 的数字
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var findClosestNumber = function (nums) {
  let min = nums[0];
  for (let i = 1; i < nums.length; i++) {
    if (Math.abs(nums[i]) < Math.abs(min)) {
      min = nums[i];
    } else if (Math.abs(nums[i]) === Math.abs(min) && nums[i] > 0) {
      min = Math.max(min, nums[i]);
    }
  }

  return min;
};

// @lc code=end
