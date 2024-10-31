/*
 * @lc app=leetcode.cn id=35 lang=javascript
 *
 * [35] 搜索插入位置
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var searchInsert = function (nums, target) {
  // 0ms 击败 100.00% O(Logn)
  let left = 0;
  let right = nums.length - 1;
  let res = target > nums.at(-1) ? nums.length : target < nums[0] ? 0 : right;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (nums[mid] === target) {
      return mid;
    } else if (nums[mid] < target) {
      left = mid + 1;
      res = nums[res] < nums[left] ? mid : res;
    } else {
      right = mid - 1;
      res = nums[res] > nums[right] ? mid : res;
    }
  }
  return res;
};

const s = searchInsert([1, 3, 5, 6], 0);
console.log(`🚀 ~ s:`, s);

// @lc code=end
