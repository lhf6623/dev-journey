/*
 * @lc app=leetcode.cn id=521 lang=javascript
 *
 * [521] 最长特殊序列 Ⅰ
 */

// @lc code=start
/**
 * @param {string} a
 * @param {string} b
 * @return {number}
 */
var findLUSlength = function (a, b) {
  return a === b ? -1 : Math.max(a.length, b.length);
};
const test = [
  [["aba", "cdc"], 3],
  [["aaa", "bbb"], 3],
  [["aaa", "aaa"], -1]
].forEach(([items, expect]) => {
  const result = findLUSlength(...items);
  console.log(`结果：${result} ${result.toString() === expect.toString() ? '✅' : '❌'}`);
})
// @lc code=end

