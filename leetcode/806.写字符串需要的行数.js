/*
 * @lc app=leetcode.cn id=806 lang=javascript
 *
 * [806] 写字符串需要的行数
 */

// @lc code=start
/**
 * @param {number[]} widths
 * @param {string} s
 * @return {number[]}
 */
var numberOfLines = function (widths, s) {
  let line = 1;
  let width = 0;
  for (let i = 0; i < s.length; i++) {
    const item = s[i];
    const item_width = widths[item.charCodeAt() - 97];
    if (width + item_width > 100) {
      line++;
      width = item_width;
    } else {
      width += item_width;
    }
  }
  return [line, width];
};

console.log(
  numberOfLines(
    [
      10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
      10, 10, 10, 10, 10, 10, 10, 10,
    ],
    "abcdefghijklmnopqrstuvwxyz"
  )
);

// @lc code=end
