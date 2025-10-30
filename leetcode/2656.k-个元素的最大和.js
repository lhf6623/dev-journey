/*
 * @lc app=leetcode.cn id=2656 lang=javascript
 *
 * [2656] K 个元素的最大和
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var maximizeSum = function (nums, k) {
  let t = Math.max(...nums)
  return t * k + ((k * (k + 1) / 2) - k)
};
const test = [
  [[[1, 2, 3, 4, 5], 3], 18],
  [[[5, 5, 5], 2], 11],
  [[[4, 4, 9, 10, 10, 9, 3, 8, 4, 2, 5, 3, 8, 6, 1, 10, 4, 5, 3, 2, 3, 9, 5, 7, 10, 4, 9, 10, 1, 10, 4], 6], 75]
].forEach(([items, expect]) => {
  const result = maximizeSum(...items);
  console.log(`结果：${result} ${result.toString() === expect.toString() ? '✅' : '❌'}`);
})
// @lc code=end

