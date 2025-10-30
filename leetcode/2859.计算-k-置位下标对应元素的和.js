/*
 * @lc app=leetcode.cn id=2859 lang=javascript
 *
 * [2859] 计算 K 置位下标对应元素的和
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var sumIndicesWithKSetBits = function (nums, k) {

  return nums.reduce((sum, num, index) => {
    const count = index.toString(2).split('').filter(item => item === '1').length
    return sum + (count === k ? num : 0)
  }, 0)
};
const test = [
  [[[5, 10, 1, 5, 2], 1], 13],
  [[[4, 3, 2, 1], 2], 1],
].forEach(([items, expect]) => {
  const result = sumIndicesWithKSetBits(...items);
  console.log(`结果：${result} ${result.toString() === expect.toString() ? '✅' : '❌'}`);
})
// @lc code=end

