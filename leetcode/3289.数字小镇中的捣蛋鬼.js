/*
 * @lc app=leetcode.cn id=3289 lang=javascript
 *
 * [3289] 数字小镇中的捣蛋鬼
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var getSneakyNumbers = function (nums) {
  return Object.entries(nums.reduce((acc, cur) => {
    acc[cur] = acc[cur] ? acc[cur] + 1 : 1;
    return acc;
  }, {})).flatMap(([key, value]) => value == 2 ? [Number(key)] : []);
};
const test = [
  [[[0, 1, 1, 0]], [0, 1]],
  [[[0, 3, 2, 1, 3, 2]], [2, 3]],
  [[[7, 1, 5, 4, 3, 4, 6, 0, 9, 5, 8, 2]], [4, 5]]
].forEach(([items, expect]) => {
  const result = getSneakyNumbers(...items);
  console.log(`结果：${result} ${result.toString() === expect.toString() ? '✅' : '❌'}`);
})
// @lc code=end

