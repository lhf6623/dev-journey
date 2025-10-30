/*
 * @lc app=leetcode.cn id=3046 lang=javascript
 *
 * [3046] 分割数组
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {boolean}
 */
var isPossibleToSplit = function (nums) {
  nums.sort((a, b) => a - b);
  let count = 0;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i - 1] === nums[i]) {
      count++;
    } else {

      if (count >= 2) return false;
      count = 0;
    }
  }
  return count < 2;
};
const test = [
  [[[9, 9, 7, 5, 6, 3, 6, 4, 9, 5]], false],
  // [[[6, 1, 3, 1, 1, 8, 9, 2]], false],
  // [[[8, 9, 8, 5, 9, 3, 3, 1, 2, 1]], true],
  // [[[1, 1, 2, 2, 3, 4]], true],
  // [[[1, 1, 1, 1]], false],
].forEach(([items, expect]) => {
  const result = isPossibleToSplit(...items);
  console.log(`结果：${result} ${result.toString() === expect.toString() ? '✅' : '❌'}`);
})
// @lc code=end

