/*
 * @lc app=leetcode.cn id=2414 lang=javascript
 *
 * [2414] 最长的字母序连续子字符串的长度
 */

// @lc code=start
/**
 * @param {string} s
 * @return {number}
 */
var longestContinuousSubstring = function (s) {
  let res = 0, str = ''
  for (let i = 0; i < s.length; i++) {
    str += s[i]
    if (s[i + 1]?.charCodeAt() - s[i].charCodeAt() !== 1) {
      res = Math.max(res, str.length)
      str = ''
    }
  }
  return res
};
// @lc code=end

