/*
 * @lc app=leetcode.cn id=290 lang=javascript
 *
 * [290] 单词规律
 */

// @lc code=start
/**
 * @param {string} pattern
 * @param {string} s
 * @return {boolean}
 */
var wordPattern = function (pattern, s) {
  // 打败 100% 的成绩
  const map = new Map();
  const arr = s.split(" ");
  if (pattern.length !== arr.length) return false;
  if (new Set(pattern).size !== new Set(arr).size) return false;

  for (let i = 0; i < arr.length; i++) {
    const element = arr[i];
    if (map.has(pattern[i])) {
      if (map.get(pattern[i]) !== element) return false;
    } else {
      map.set(pattern[i], element);
    }
  }
  return true;
};
const w = wordPattern("abba", "dog cat dog cat");
console.log(`🚀 ~ w:`, w);
// @lc code=end
