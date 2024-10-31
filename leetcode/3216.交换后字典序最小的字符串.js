/*
 * @lc app=leetcode.cn id=3216 lang=javascript
 *
 * [3216] 交换后字典序最小的字符串
 */

// @lc code=start
/**
 * @param {string} s
 * @return {string}
 */
var getSmallestString = function (s) {
  const _s = s.split("");
  for (let i = 0; i < s.length - 1; i++) {
    const item = s[i];

    if (item % 2 == s[i + 1] % 2 && item > s[i + 1]) {
      _s[i] = s[i + 1];
      _s[i + 1] = item;
      return _s.join("");
    }
  }
  return s;
};
const g = getSmallestString("45320");
console.log(`🚀 ~ g:`, g);

// @lc code=end
