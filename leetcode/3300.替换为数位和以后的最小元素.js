/*
 * @lc app=leetcode.cn id=3300 lang=javascript
 *
 * [3300] 替换为数位和以后的最小元素
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var minElement = function (nums) {
  let ans = 10 ** 4 + 1
  for (let i = 0; i < nums.length; i++) {
    let sum = 0
    while (nums[i]) {
      sum += nums[i] % 10
      nums[i] = nums[i] / 10 | 0
    }
    ans = Math.min(ans, sum)
  }
  return ans
};
const test = [
  [[[10, 12, 13, 14]], 1],
  [[[1, 2, 3, 4]], 1],
  [[[999, 19, 199]], 10],
].forEach(([items, expect]) => {
  const result = minElement(...items);
  console.log(`结果：${result} ${result.toString() === expect.toString() ? '✅' : '❌'}`);
})
// @lc code=end

