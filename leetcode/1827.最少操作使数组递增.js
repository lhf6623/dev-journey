/*
 * @lc app=leetcode.cn id=1827 lang=javascript
 *
 * [1827] 最少操作使数组递增
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var minOperations = function (nums) {
  let ans = 0;
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] <= nums[i - 1]) {
      ans += nums[i - 1] - nums[i] + 1;
      nums[i] = nums[i - 1] + 1;
    }
  }
  return ans;
};
const test = [
  [[[1, 1, 1]], 3],
  [[[1, 5, 2, 4, 1]], 14],
  [[[8]], 0]
].forEach(([items, expect]) => {
  const result = minOperations(...items);
  console.log(`结果：${result} ${result.toString() === expect.toString() ? '✅' : '❌'}`);
})
// @lc code=end

