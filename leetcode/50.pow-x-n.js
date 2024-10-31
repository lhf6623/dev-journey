/*
 * @lc app=leetcode.cn id=50 lang=javascript
 *
 * [50] Pow(x, n)
 */

// @lc code=start
/**
 * @param {number} x
 * @param {number} n
 * @return {number}
 */
var myPow = function (x, n) {
  let res = 1;
  if (n < 0) {
    n = -n;
    x = 1 / x;
  }
  while (n) {
    if (n & 1) {
      res *= x;
    }
    x *= x;
    n = Math.floor(n / 2);
  }
  return res;
};
const p = myPow(2.0, -2);
console.log(`🚀 ~ p:`, p);

// @lc code=end
