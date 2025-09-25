/*
 * @lc app=leetcode.cn id=1909 lang=javascript
 *
 * [1909] 删除一个元素使数组严格递增
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canBeIncreasing = function (nums) {
  let del = false;
  for (let i = 1; i < nums.length; i++) {
    if (!(nums[i - 1] < nums[i])) {
      if (del) return false;

      if (i + 1 < nums.length) {
        if (
          nums[i + 1] > nums[i - 1] ||
          (i > 1 && nums[i] > nums[i - 2]) ||
          i == 1
        ) {
          del = true;
        } else {
          return false;
        }
      }
    }
  }
  return true;
};

const test = [
  [[1, 2, 10, 5, 7], true],
  [[2, 3, 1, 2], false],
  [[1, 1, 1], false],
  [[1, 2, 3], true],
  [[105, 924, 32, 968], true],
];

for (const [nums, expect] of test) {
  const result = canBeIncreasing(nums);
  console.log(`测试用例: ${nums}: ${expect === result ? "通过" : "未通过"}`);
}
// @lc code=end
