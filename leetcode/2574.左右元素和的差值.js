/*
 * @lc app=leetcode.cn id=2574 lang=javascript
 *
 * [2574] 左右元素和的差值
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var leftRightDifference = function (nums) {
  let ans = new Array(nums.length);
  let leftSum = 0;
  let rightSum = nums.reduce((a, b) => a + b);
  for (let i = 0; i < nums.length; i++) {
    rightSum -= nums[i];
    ans[i] = Math.abs(leftSum - rightSum);
    leftSum += nums[i];
  }
  return ans;
};
const test = [
  [[[10, 4, 8, 3]], [15, 1, 11, 22]],
  [[[1]], [0]],
].forEach(([items, expect]) => {
  const result = leftRightDifference(...items);
  console.log(`结果：${result} ${result.toString() === expect.toString() ? '✅' : '❌'}`);
})
// @lc code=end

