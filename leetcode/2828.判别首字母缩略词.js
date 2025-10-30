/*
 * @lc app=leetcode.cn id=2828 lang=javascript
 *
 * [2828] 判别首字母缩略词
 */

// @lc code=start
/**
 * @param {string[]} words
 * @param {string} s
 * @return {boolean}
 */
var isAcronym = function (words, s) {
  // return words.map(item => item[0]).join('') === s;
  if (words.length !== s.length) return false;
  for (let i = 0; i < words.length; i++) {
    if (words[i][0] !== s[i] || s[i] === undefined) {
      return false;
    }
  }
  return true;
};
const test = [
  [[["alice", "bob", "charlie"], "abc"], true],
  [[["an", "apple"], "a"], false],
  [[["never", "gonna", "give", "up", "on", "you"], "ngguoy"], true]
].forEach(([items, expect]) => {
  const result = isAcronym(...items);
  console.log(`结果：${result} ${result.toString() === expect.toString() ? '✅' : '❌'}`);
})
// @lc code=end

