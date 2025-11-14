/*
 * @lc app=leetcode.cn id=643 lang=javascript
 *
 * [643] 子数组最大平均数 I
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var findMaxAverage = function (nums, k) {
  let sum = 0;
  for (let i = 0; i < k; i++) {
    sum += nums[i];
  }
  let res = sum / k;
  for (let i = k; i < nums.length; i++) {
    sum += nums[i] - nums[i - k];
    res = Math.max(res, sum / k);
  }

  return res;
};
const test = [
  [[[1, 12, -5, -6, 50, 3], 4], 12.75],
  [[[5], 1], 5.00000],
].forEach(([items, expect]) => {
  const result = findMaxAverage(...items);
  console.log(`结果：${result} ${result.toString() === expect.toString() ? '✅' : '❌'}`);
})
// @lc code=end

