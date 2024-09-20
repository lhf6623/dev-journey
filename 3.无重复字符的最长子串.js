/*
 * @lc app=leetcode.cn id=3 lang=javascript
 *
 * [3] 无重复字符的最长子串
 */

// @lc code=start
/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function (s) {
  let res = 0, temp = '';
  for (let i = 0; i < s.length; i++) {
    let j = i + 1;
    temp = s[i];
    while (true) {
      if (s[j] === undefined || temp.includes(s[j])) {
        res = Math.max(res, temp.length)
        break;
      }
      temp += s[j]
      j++
    }
  }
  return res
};
// @lc code=end

