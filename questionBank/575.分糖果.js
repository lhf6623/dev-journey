/*
 * @lc app=leetcode.cn id=575 lang=javascript
 *
 * [575] 分糖果
 */

// @lc code=start
/**
 * @param {number[]} candyType
 * @return {number}
 */
var distributeCandies = function (candyType) {
  const n = candyType.length;
  const set = new Set(candyType);
  return Math.min(n / 2, set.size);
};
// @lc code=end

