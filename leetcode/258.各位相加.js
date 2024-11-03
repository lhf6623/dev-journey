/*
 * @lc app=leetcode.cn id=258 lang=javascript
 *
 * [258] 各位相加
 */

// @lc code=start
/**
 * @param {number} num
 * @return {number}
 */
var addDigits = function (num) {
  while (num > 9) {
    num = Math.floor(num / 10) + (num % 10);
  }
  return num;
};

const a = addDigits(38);
console.log(`🚀 ~ a:`, a);

// @lc code=end
