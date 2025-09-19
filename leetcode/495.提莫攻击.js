/*
 * @lc app=leetcode.cn id=495 lang=javascript
 *
 * [495] 提莫攻击
 */

// @lc code=start
/**
 * @param {number[]} timeSeries
 * @param {number} duration
 * @return {number}
 */
var findPoisonedDuration = function (timeSeries, duration) {
  let res = 0;
  for (let i = 0; i < timeSeries.length; i++) {
    if (i === timeSeries.length - 1) {
      res += duration;
    } else {
      res += Math.min(duration, timeSeries[i + 1] - timeSeries[i]);
    }
  }
  return res;
};

console.log(findPoisonedDuration([1, 4], 2));

// @lc code=end
