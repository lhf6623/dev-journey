/*
 * @lc app=leetcode.cn id=69 lang=javascript
 *
 * [69] x 的平方根 
 */

// @lc code=start
/**
 * @param {number} x
 * @return {number}
 */
var mySqrt = function (x) {
  // 牛顿迭代法
  let t = x;
  const err = 1e-15;
  while (Math.abs(t - x / t) > err * t) {
    t = (x / t + t) / 2;
  }
  return t | 0;
};
console.log(mySqrt(1440));

// @lc code=end

