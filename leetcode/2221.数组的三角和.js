/*
 * @lc app=leetcode.cn id=2221 lang=javascript
 *
 * [2221] 数组的三角和
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var triangularSum = function (nums) {
  // TOD: 应该有数学公式
  if (nums.length === 1) return nums[0]
  let newNums = [];
  while (nums.length >= 2) {
    for (let i = 0; i < nums.length - 1; i++) {
      newNums.push((nums[i] + nums[i + 1]) % 10)
    }
    nums = newNums;
    newNums = []
  }
  return nums[0];
};

const test = [
  [[1, 2, 3, 4, 5], 8],
  [[5], 5],
  [[1, 3], 4],
]

test.forEach(([nums, expect]) => {
  const result = triangularSum(nums);
  console.log(`测试用例：${nums}: 结果${result},${expect === result ? "通过" : "未通过"}`)
})
// @lc code=end

