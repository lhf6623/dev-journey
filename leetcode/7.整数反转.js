/*
 * @lc app=leetcode.cn id=7 lang=javascript
 *
 * [7] 整数反转
 */

// @lc code=start
/**
 * @param {number} x
 * @return {number}
 */
var reverse = function (x) {
  const minus = x < 0 ? -1 : 1;
  const _x = Math.abs(x).toString().split("").reverse().join("");
  if (_x > Math.pow(2, 31) - 1) {
    return 0;
  }
  return _x * minus;
};

const r = reverse(Math.pow(2, 31));
console.log(`🚀 ~ r:`, r);
// @lc code=end
