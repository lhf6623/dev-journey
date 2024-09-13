/*
 * @lc app=leetcode.cn id=2390 lang=javascript
 *
 * [2390] 从字符串中移除星号
 */

// @lc code=start
/**
 * @param {string} s
 * @return {string}
 */
var removeStars = function (s) {

  // return s.split('').reduce((pre, curr) => (pre[curr === '*' ? 'pop' : 'push'](curr), pre), []).join('')
  const res_arr = []
  for (let i = 0; i < s.length; i++) {
    if (s[i] === '*') {
      res_arr.pop()
    } else {
      res_arr.push(s[i])
    }
  }
  return res_arr.join('')
};
// @lc code=end

