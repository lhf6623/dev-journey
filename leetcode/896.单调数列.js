/*
 * @lc app=leetcode.cn id=896 lang=javascript
 *
 * [896] 单调数列
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {boolean}
 */
var isMonotonic = function (nums) {
  let flag = 0;
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] > nums[i - 1]) {
      if (flag === -1) return false;
      flag = 1;
    } else if (nums[i] < nums[i - 1]) {
      if (flag === 1) return false;
      flag = -1;
    }
  }
  return true;
};
const test = [
  [[[1, 2, 2, 3]], true],
  [[[6, 5, 4, 4]], true],
  [[[1, 3, 2]], false],
].forEach(([items, expect]) => {
  const result = isMonotonic(...items);
  console.log(`结果：${result} ${result.toString() === expect.toString() ? '✅' : '❌'}`);
})
// @lc code=end

