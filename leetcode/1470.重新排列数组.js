/*
 * @lc app=leetcode.cn id=1470 lang=javascript
 *
 * [1470] 重新排列数组
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} n
 * @return {number[]}
 */
var shuffle = function (nums, n) {
  let res = [];
  let i = 0;
  while (i < n) {
    res.push(nums[i], nums[i + n]);
    i++;
  }
  return res;
};
const test = [
  [[[2, 5, 1, 3, 4, 7], 3], [2, 3, 5, 4, 1, 7]],
  [[[1, 2, 3, 4, 4, 3, 2, 1], 4], [1, 4, 2, 3, 3, 2, 4, 1]],
  [[[1, 1, 2, 2], 2], [1, 2, 1, 2]]
].forEach(([items, expect]) => {
  const result = shuffle(...items);
  console.log(`结果：${result} ${result.toString() === expect.toString() ? '✅' : '❌'}`);
})

// @lc code=end
