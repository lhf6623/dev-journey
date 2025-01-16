/*
 * @lc app=leetcode.cn id=3065 lang=javascript
 *
 * [3065] 超过阈值的最少操作数 I
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var minOperations = function (nums, k) {
  return nums.filter((n) => n < k).length;
};

const arr1 = [2, 11, 10, 1, 3];
const k = 10;
const m = minOperations(arr1, k);
console.log(m);

// @lc code=end
