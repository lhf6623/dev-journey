/*
 * @lc app=leetcode.cn id=3151 lang=javascript
 *
 * [3151] 特殊数组 I
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {boolean}
 */
var isArraySpecial = function (nums) {
  for (let i = 0; i < nums.length - 1; i++) {
    const n = (nums[i] + nums[i + 1]) / 2
    if (n === (n | 0)) return false
  }
  return true;
};
const test = [
  [[[1]], true],
  [[[2, 1, 4]], true],
  [[[4, 3, 1, 6]], false],
].forEach(([items, expect]) => {
  const result = isArraySpecial(...items);
  console.log(`结果：${result} ${result.toString() === expect.toString() ? '✅' : '❌'}`);
})
// @lc code=end

