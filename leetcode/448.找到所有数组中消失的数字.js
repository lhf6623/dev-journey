/*
 * @lc app=leetcode.cn id=448 lang=javascript
 *
 * [448] 找到所有数组中消失的数字
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var findDisappearedNumbers = function (nums) {
  const n = nums.length;
  for (const num of nums) {
    const x = (num - 1) % n;
    nums[x] += n;
  }
  const ret = [];
  for (const [i, num] of nums.entries()) {
    if (num <= n) {
      ret.push(i + 1);
    }
  }
  return ret;
};
const f = findDisappearedNumbers([1, 1, 2]);
console.log(`🚀 ~ f:`, f);

// @lc code=end
