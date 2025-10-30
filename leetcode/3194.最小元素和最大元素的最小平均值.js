/*
 * @lc app=leetcode.cn id=3194 lang=javascript
 *
 * [3194] 最小元素和最大元素的最小平均值
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var minimumAverage = function (nums) {
  let min = 51;
  const len = nums.length;
  nums.sort((a, b) => a - b);
  for (let i = 0; i < nums.length / 2; i++) {
    min = Math.min(min, (nums[i] + nums[len - i - 1]) / 2);
  }
  return min;
};
const test = [
  [[[7, 8, 3, 4, 15, 13, 4, 1]], 5.5],
  [[[1, 9, 8, 3, 10, 5]], 5.5],
  [[[1, 2, 3, 7, 8, 9]], 5.0]
].forEach(([items, expect]) => {
  const result = minimumAverage(...items);
  console.log(`结果：${result} ${result.toString() === expect.toString() ? '✅' : '❌'}`);
})
// @lc code=end

