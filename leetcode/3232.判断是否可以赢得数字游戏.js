/*
 * @lc app=leetcode.cn id=3232 lang=javascript
 *
 * [3232] 判断是否可以赢得数字游戏
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canAliceWin = function (nums) {
  let sum = 0;
  let singleSum = 0;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] < 10) {
      singleSum += nums[i]
    } else {
      sum += nums[i]
    }
  }
  return sum != singleSum

  // const sum = nums.reduce((a, b) => a + b, 0)
  // const singleSun = nums.filter(item => item < 10).reduce((a, b) => a + b, 0)
  // return sum - singleSun != singleSun
};
const test = [
  [[[1, 2, 3, 4, 10]], false],
  [[[1, 2, 3, 4, 5, 14]], true],
  [[[5, 5, 5, 25]], true],
].forEach(([items, expect]) => {
  const result = canAliceWin(...items);
  console.log(`结果：${result} ${result.toString() === expect.toString() ? '✅' : '❌'}`);
})
// @lc code=end

