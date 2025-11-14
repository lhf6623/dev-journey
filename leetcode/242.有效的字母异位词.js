/*
 * @lc app=leetcode.cn id=242 lang=javascript
 *
 * [242] 有效的字母异位词
 */

// @lc code=start
/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isAnagram = function (s, t) {
  return s.length == t.length && [...s].sort().join('') === [...t].sort().join('')
};
const test = [
  [["anagram", "nagaram"], true],
  [["rat", "car"], false],
].forEach(([items, expect]) => {
  const result = isAnagram(...items);
  console.log(`结果：${result} ${result.toString() === expect.toString() ? '✅' : '❌'}`);
})
// @lc code=end

