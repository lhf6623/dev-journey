/*
 * @lc app=leetcode.cn id=2176 lang=javascript
 *
 * [2176] 统计数组中相等且可以被整除的数对
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var countPairs = function (nums, k) {
  let count = 0;
  const len = nums.length;
  for (let i = 0; i < len; i++) {
    for (let j = i + 1; j < len; j++) {
      if (nums[i] === nums[j] && (i * j) % k === 0) {
        count++;
      }
    }
  }
  return count;
};
const test = [
  [[[3, 1, 2, 2, 2, 1, 3], 2], 4],
  [[[1, 2, 3, 4], 1], 0],
].forEach(([items, expect]) => {
  const result = countPairs(...items);
  console.log(`结果：${result} ${result.toString() === expect.toString() ? '✅' : '❌'}`);
})
// @lc code=end

