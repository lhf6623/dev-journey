/*
 * @lc app=leetcode.cn id=3471 lang=javascript
 *
 * [3471] 找出最大的几近缺失整数
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var largestInteger = function (nums, k) {
  const len = nums.length;
  if (k === len) return Math.max(...nums);

  const map = new Map();
  // 每次做辅助数据，结果都不太好 3ms 50%
  for (let i = 0; i < len; i++) {
    const item = nums[i];
    if (!map.has(item)) {
      map.set(item, i);
    } else {
      nums[i] = -1;
      nums[map.get(item)] = -1;
    }
  }

  if (k === 1) return Math.max(...nums)
  return Math.max(nums[0], nums[len - 1]);
};
const test = [
  [[[7, 11, 7, 7], 1], 11],
  [[[4, 4, 2, 2, 2, 0, 5, 3, 4, 4], 3], -1],
  [[[7, 5, 9, 10, 0, 12, 3, 12, 10], 1], 9],
  [[[3, 0, 12, 7, 1, 11], 6], 12],
  [[[3, 1, 7, 10, 0], 1], 10],
  [[[0, 0], 2], 0],
  [[[3, 9, 2, 1, 7], 3], 7],
  [[[3, 9, 7, 2, 1, 7], 4], 3],
  [[[0, 0], 1], -1]
].forEach(([items, expect]) => {
  const result = largestInteger(...items);
  console.log(`结果：${result} ${result.toString() === expect.toString() ? '✅' : '❌'}`);
})
// @lc code=end

