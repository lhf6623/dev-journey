/*
 * @lc app=leetcode.cn id=2243 lang=javascript
 *
 * [2243] 计算字符串的数字和
 */

// @lc code=start
/**
 * @param {string} s
 * @param {number} k
 * @return {string}
 */
var digitSum = function (s, k) {
  if (s.length <= k) return s;
  let sum = [s[0] - 0];
  for (let i = 1; i < s.length; i++) {
    if (i % k === 0) {
      sum[sum.length] = s[i] - 0;
    } else {
      sum[sum.length - 1] = sum.at(-1) + (s[i] - 0);
    }
  }
  if (sum.join("").length > k) {
    return digitSum(sum.join(""), k);
  }
  return sum.join("");
};

// @lc code=end
