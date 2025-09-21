/*
 * @lc app=leetcode.cn id=1470 lang=javascript
 *
 * [1470] 重新排列数组
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} n
 * @return {number[]}
 */
var shuffle = function (nums, n) {
  let res = [];
  let i = 0;
  while (i < n) {
    res.push(nums[i], nums[i + n]);
    i++;
  }
  return res;
};
console.log(shuffle([2, 5, 1, 3, 4, 7], 3));

// @lc code=end
