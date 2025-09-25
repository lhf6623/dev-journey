/*
 * @lc app=leetcode.cn id=1984 lang=javascript
 *
 * [1984] 学生分数的最小差值
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var minimumDifference = function (nums, k) {
  nums.sort((a, b) => a - b);
  let res = 10 ** 5;
  const n = nums.length - k + 1;
  for (let i = 0; i < n; i++) {
    const diff = nums[i + k - 1] - nums[i];
    if (diff < res) {
      res = diff;
    }
  }
  return res;
};

console.log(minimumDifference([9], 1));

// @lc code=end
