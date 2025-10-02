/*
 * @lc app=leetcode.cn id=3190 lang=javascript
 *
 * [3190] 使所有元素都可以被 3 整除的最少操作数
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var minimumOperations = function (nums) {
  // 整数3的倍数占 三分之一，去掉原本的3的倍数，加减后就是三的倍数
  return nums.filter(item => item % 3).length
};
const test = [
  [[1, 2, 3, 4], 3],
  [[3, 6, 9], 0],
];
test.forEach(([nums, expect]) => {
  const result = minimumOperations(nums);
  console.log(
    `测试用例: ${nums}, 预期: ${expect}, 结果: ${result} ${expect === result ? "通过" : "未通过"}`
  );
});
// @lc code=end

