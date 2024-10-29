/*
 * @lc app=leetcode.cn id=9 lang=javascript
 *
 * [9] 回文数
 */

// @lc code=start
/**
 * @param {number} x
 * @return {boolean}
 */
var isPalindrome = function (x) {
  const _x = x.toString();
  const len = _x.length;
  for (let i = 0; i < len / 2; i++) {
    if (_x[i] !== _x[len - 1 - i]) return false;
  }
  return true;
};

const i = isPalindrome(-1221);
console.log(`🚀 ~ i:`, i);
// @lc code=end
