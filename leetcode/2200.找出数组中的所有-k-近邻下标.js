/*
 * @lc app=leetcode.cn id=2200 lang=javascript
 *
 * [2200] 找出数组中的所有 K 近邻下标
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} key
 * @param {number} k
 * @return {number[]}
 */
var findKDistantIndices = function (nums, key, k) {
  const res = [];
  const n = nums.length;
  // 遍历数对
  for (let i = 0; i < n; ++i) {
    for (let j = 0; j < n; ++j) {
      if (nums[j] === key && Math.abs(i - j) <= k) {
        res.push(i);
        break; // 提前结束以防止重复添加
      }
    }
  }
  return res;
};
const test = [
  [[[3, 4, 9, 1, 3, 9, 5], 9, 1], [1, 2, 3, 4, 5, 6]],
  [[[2, 2, 2, 2, 2], 2, 2], [0, 1, 2, 3, 4]],
].forEach(([items, expect]) => {
  const result = findKDistantIndices(...items);
  console.log(`结果：${result} ${result.toString() === expect.toString() ? '✅' : '❌'}`);
})
// @lc code=end

