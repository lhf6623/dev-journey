/*
 * @lc app=leetcode.cn id=2275 lang=javascript
 *
 * [2275] 按位与结果大于零的最长组合
 */

// @lc code=start
/**
 * @param {number[]} candidates
 * @return {number}
 */
var largestCombination = function (candidates) {
  let maxCount = 0;
  for (let i = 0; i < 24; i++) {
    let count = 0;
    // 遍历候选数组中的每一个数字
    for (let num of candidates) {
      // 检查当前数字的第 i 位是否为 1
      if ((num & (1 << i)) !== 0) {
        // 如果是，则计数器加一
        count++;
      }
    }
    maxCount = Math.max(maxCount, count);
  }
  return maxCount;
};
const arr1 = [16, 17, 71, 62, 12, 24, 14];
const l = largestCombination(arr1);
console.log(l);

// @lc code=end
