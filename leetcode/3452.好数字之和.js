/*
 * @lc app=leetcode.cn id=3452 lang=javascript
 *
 * [3452] 好数字之和
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var sumOfGoodNumbers = function (nums, k) {
  let sum = 0;
  const len = nums.length;
  for (let i = 0; i < len; i++) {
    if (!(i - k >= 0 && nums[i] <= nums[i - k]) && !(i + k < len && nums[i] <= nums[i + k])) {
      sum += nums[i];
    }
  }
  return sum;
};
const test = [
  [[[1, 3, 2, 1, 5, 4], 2], 12],
  [[[2, 1], 1], 2],
].forEach(([items, expect]) => {
  const result = sumOfGoodNumbers(...items);
  console.log(`结果：${result} ${result.toString() === expect.toString() ? '✅' : '❌'}`);
})
// @lc code=end

