/*
 * @lc app=leetcode.cn id=1967 lang=javascript
 *
 * [1967] 作为子字符串出现在单词中的字符串数目
 */

// @lc code=start
/**
 * @param {string[]} patterns
 * @param {string} word
 * @return {number}
 */
var numOfStrings = function (patterns, word) {
  return patterns.filter(pattern => word.includes(pattern)).length;
};
const test = [
  [[["a", "abc", "bc", "d"], "abc"], 3],
  [[["a", "b", "c"], "aaaaabbbbb"], 2],
  [[["a", "a", "a"], "ab"], 3],
].forEach(([items, expect]) => {
  const result = numOfStrings(...items);
  console.log(`结果：${result} ${result.toString() === expect.toString() ? '✅' : '❌'}`);
})
// @lc code=end

