/*
 * @lc app=leetcode.cn id=1732 lang=javascript
 *
 * [1732] 找到最高海拔
 */

// @lc code=start
/**
 * @param {number[]} gain
 * @return {number}
 */
var largestAltitude = function (gain) {
  let max = 0,
    height = 0;
  for (let i = 0; i < gain.length; i++) {
    height += gain[i];
    max = Math.max(max, height);
  }
  return max;
};

console.log(largestAltitude([-4, -3, -2, -1, 4, 3, 2]));

// @lc code=end
