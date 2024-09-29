/*
 * @lc app=leetcode.cn id=1154 lang=javascript
 *
 * [1154] 一年中的第几天
 */

// @lc code=start
/**
 * @param {string} date
 * @return {number}
 */
var dayOfYear = function (date) {
  let [year, month, day] = date.split('-').map(Number)
  let res = 0
  let arr = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
  if (((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) && month > 2) {
    res += 1
  }
  for (let i = 0; i < month - 1; i++) {
    res += arr[i]
  }
  return res + day
  // 暴力
  // return (Date.parse(date) - Date.parse(`${year - 1}-12-31`)) / 1000 / 60 / 60 / 24
};
// @lc code=end

