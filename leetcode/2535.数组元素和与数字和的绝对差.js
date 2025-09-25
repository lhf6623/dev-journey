/*
 * @lc app=leetcode.cn id=2535 lang=javascript
 *
 * [2535] 数组元素和与数字和的绝对差
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var differenceOfSum = function (nums) {
  return nums.reduce((acc, cur) => {
    if (cur < 10) return acc;
    return acc + Math.abs(getSum(cur) - cur);
  }, 0);
};

function getSum(num) {
  let sum = 0;
  while (num) {
    sum += num % 10;
    num = Math.floor(num / 10);
  }
  return sum;
}

const test = [
  [[1, 15, 6, 3], 9],
  [[1, 2, 3, 4], 0],
  [[2, 7, 8, 10, 8, 10, 1, 10, 5, 9], 27],
];
for (const [nums, expect] of test) {
  const result = differenceOfSum(nums);
  console.log(`测试用例: ${nums}: ${expect === result ? "通过" : "未通过"}`);
}
// @lc code=end
