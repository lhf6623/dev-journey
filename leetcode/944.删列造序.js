/*
 * @lc app=leetcode.cn id=944 lang=javascript
 *
 * [944] 删列造序
 */

// @lc code=start
/**
 * @param {string[]} strs
 * @return {number}
 */
var minDeletionSize = function (strs) {
  let num = 0;
  const LEN = strs.length;
  for (let i = 0; i < strs[0].length; i++) {
    for (let j = 1; j < LEN; j++) {
      if (strs[j - 1][i] > strs[j][i]) {
        num += 1;
        break;
      }
    }
  }
  return num;
};

// @lc code=end
