/*
 * @lc app=leetcode.cn id=645 lang=javascript
 *
 * [645] 错误的集合
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var findErrorNums = function (nums) {
  // 内存 100% 时间 5%
  let lack = null;
  let repeat = null;
  for (let i = 0; i < nums.length; i++) {
    if (nums.lastIndexOf(i + 1) == -1) {
      lack = i + 1;
    }
    if (nums.lastIndexOf(nums[i]) != i) {
      repeat = nums[i];
    }
    if (repeat !== null && lack !== null) break;
  }
  return [repeat, lack];
};

console.log(findErrorNums([1, 2, 2, 4]));

// @lc code=end
