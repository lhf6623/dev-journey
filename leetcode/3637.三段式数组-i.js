/*
 * @lc app=leetcode.cn id=3637 lang=javascript
 *
 * [3637] 三段式数组 I
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {boolean}
 */
var isTrionic = function (nums) {
  const checks = [
    (i) => nums[i] - nums[i - 1] > 0,
    (i) => nums[i] - nums[i - 1] < 0,
    (i) => nums[i] - nums[i - 1] > 0,
  ];
  let fn = checks.shift();
  for (let i = 1; i < nums.length; i++) {
    // 确保第一段开头递增
    if (i === 1 && !fn(i)) return false;
    if (!fn(i)) {
      fn = checks.shift();
      if (fn == undefined) return false;

      if (!fn(i)) return false;
    }
  }

  return !checks.length;
};

console.log(isTrionic([2, 1, 3]));

// @lc code=end
