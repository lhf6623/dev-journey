/*
 * @lc app=leetcode.cn id=2057 lang=javascript
 *
 * [2057] 值相等的最小索引
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var smallestEqual = function (nums) {
  for (let i = 0; i < nums.length; i++) {
    if (i % 10 === nums[i]) {
      return i;
    }
  }
  return -1;
};
const test = [
  [[[0, 1, 2]], 0],
  [[[4, 3, 2, 1]], 2],
  [[[1, 2, 3, 4, 5, 6, 7, 8, 9, 0]], -1],
  [[[2, 1, 3, 5, 2]], 1]
].forEach(([items, expect]) => {
  const result = smallestEqual(...items);
  console.log(`结果：${result} ${result.toString() === expect.toString() ? '✅' : '❌'}`);
})
// @lc code=end

