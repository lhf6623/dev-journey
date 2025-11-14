/*
 * @lc app=leetcode.cn id=2465 lang=javascript
 *
 * [2465] 不同的平均值数目
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var distinctAverages = function (nums) {
  nums.sort((a, b) => a - b);
  let ans = new Set();
  for (let i = 0; i < nums.length / 2; i++) {
    ans.add((nums[i] + nums[nums.length - 1 - i]) / 2);
  }
  return ans.size;
};
const test = [
  [[[4, 1, 4, 0, 3, 5]], 2],
  [[[1, 100]], 1],
].forEach(([items, expect]) => {
  const result = distinctAverages(...items);
  console.log(`结果：${result} ${result.toString() === expect.toString() ? '✅' : '❌'}`);
})
// @lc code=end

