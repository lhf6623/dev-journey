/*
 * @lc app=leetcode.cn id=14 lang=javascript
 *
 * [14] 最长公共前缀
 */

// @lc code=start
/**
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function (strs) {
  if (strs.length === 0) return "";
  let prefix = strs[0];
  for (let i = strs.length - 1; i >= 0; i--) {
    const min = Math.min(prefix.length, strs[i].length);
    let j = 0;
    while (j < min && prefix[j] === strs[i][j]) {
      j++;
    }
    prefix = prefix.substring(0, j);
  }

  return prefix;
};
const l = longestCommonPrefix(["cdog", "cracecar", "car"]);
console.log(`🚀 ~ l:`, l);

// @lc code=end
