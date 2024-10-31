/*
 * @lc app=leetcode.cn id=3270 lang=javascript
 *
 * [3270] 求出数字答案
 */

// @lc code=start
/**
 * @param {number} num1
 * @param {number} num2
 * @param {number} num3
 * @return {number}
 */
var generateKey = function (num1, num2, num3) {
  let res = "";
  const len = Math.max(
    num1.toString().length,
    num2.toString().length,
    num3.toString().length
  );
  const _num1 = num1.toString().padStart(len, "0");
  const _num2 = num2.toString().padStart(len, "0");
  const _num3 = num3.toString().padStart(len, "0");

  for (let i = 0; i < len; i++) {
    res += Math.min(_num1[i], _num2[i], _num3[i]).toString();
  }
  return res | 0;
};
const g = generateKey(987, 879, 798);
console.log(`🚀 ~ g:`, g);

// @lc code=end
