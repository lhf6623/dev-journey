/*
 * @lc app=leetcode.cn id=1684 lang=javascript
 *
 * [1684] 统计一致字符串的数目
 */

// @lc code=start
/**
 * @param {string} allowed
 * @param {string[]} words
 * @return {number}
 */
var countConsistentStrings = function (allowed, words) {

  return words.reduce((acc, word) => {
    return acc + (word.split('').every(char => allowed.includes(char)) ? 1 : 0);
  }, 0);

  // let allowedSet = new Set(allowed);
  // return words.reduce((acc, word) => {
  //   return acc + (word.split('').every(char => allowedSet.has(char)) ? 1 : 0);
  // }, 0);
};
const test = [
  [["ab", ["ad", "bd", "aaab", "baa", "badab"]], 2],
  [["abc", ["a", "b", "c", "ab", "ac", "bc", "abc"]], 7],
  [["cad", ["cc", "acd", "b", "ba", "bac", "bad", "ac", "d"]], 4],
].forEach(([items, expect]) => {
  const result = countConsistentStrings(...items);
  console.log(`结果：${result} ${result.toString() === expect.toString() ? '✅' : '❌'}`);
})
// @lc code=end

