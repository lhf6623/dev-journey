/*
 * @lc app=leetcode.cn id=1920 lang=javascript
 *
 * [1920] 基于排列构建数组
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var buildArray = function (nums) {
  return nums.map((_, index) => nums[nums[index]]);
};
const test = [
  [[[0, 2, 1, 5, 3, 4]], [0, 1, 2, 4, 5, 3]],
  [[[5, 0, 1, 2, 3, 4]], [4, 5, 0, 1, 2, 3]],
]
test.forEach(([items, expect]) => {
  const result = buildArray(...items);
  console.log(`结果：${result} ${result.toString() === expect.toString() ? '✅' : '❌'}`);
})
// @lc code=end

