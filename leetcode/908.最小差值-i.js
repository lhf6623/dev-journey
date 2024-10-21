/*
 * @lc app=leetcode.cn id=908 lang=javascript
 *
 * [908] 最小差值 I
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var smallestRangeI = function (nums, k) {
  nums.sort((a, b) => a - b);
  let i = nums[nums.length - 1] - k - (nums[0] + k);
  return i > 0 ? i : 0;
};

console.log(smallestRangeI([1], 0));

// @lc code=end
