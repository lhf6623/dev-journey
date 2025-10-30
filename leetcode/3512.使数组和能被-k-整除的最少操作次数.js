/*
 * @lc app=leetcode.cn id=3512 lang=javascript
 *
 * [3512] 使数组和能被 K 整除的最少操作次数
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var minOperations = function (nums, k) {
  return nums.reduce((acc, cur) => acc + cur, 0) % k
};
const test = [
  [[[3, 9, 7], 5], 4],
  [[[4, 1, 3], 4], 0],
]
test.forEach(([items, expect]) => {
  const result = minOperations(...items);
  console.log(`结果：${result} ${result.toString() === expect.toString() ? '✅' : '❌'}`);
})
// @lc code=end

