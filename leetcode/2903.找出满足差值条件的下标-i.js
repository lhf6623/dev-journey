/*
 * @lc app=leetcode.cn id=2903 lang=javascript
 *
 * [2903] 找出满足差值条件的下标 I
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} indexDifference
 * @param {number} valueDifference
 * @return {number[]}
 */
var findIndices = function (nums, indexDifference, valueDifference) {
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + indexDifference; j < nums.length; j++) {
      if (Math.abs(nums[i] - nums[j]) >= valueDifference) {
        return [i, j];
      }
    }
  }
  return [-1, -1];
};
const test = [
  [[[5, 1, 4, 1], 2, 4], [0, 3]],
  [[[2, 1], 0, 0], [0, 0]],
  [[[1, 2, 3], 2, 4], [-1, -1]],
].forEach(([items, expect]) => {
  const result = findIndices(...items);
  console.log(`结果：${result} ${result.toString() === expect.toString() ? '✅' : '❌'}`);
})
// @lc code=end

