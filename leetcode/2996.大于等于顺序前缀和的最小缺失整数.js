/*
 * @lc app=leetcode.cn id=2996 lang=javascript
 *
 * [2996] 大于等于顺序前缀和的最小缺失整数
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var missingInteger = function (nums) {
  let sum = nums[0];
  const set = new Set(nums);
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] - nums[i - 1] == 1) {
      sum += nums[i];
    } else {
      break;
    }
  }
  while (set.has(sum)) {
    sum++
  }

  return sum
};
const test = [
  [[[38]], 39],
  [[[1, 2, 3, 2, 5]], 6],
  [[[3, 4, 5, 1, 12, 14, 13]], 15],
].forEach(([items, expect]) => {
  const result = missingInteger(...items);
  console.log(`结果：${result} ${result.toString() === expect.toString() ? '✅' : '❌'}`);
})
// @lc code=end

