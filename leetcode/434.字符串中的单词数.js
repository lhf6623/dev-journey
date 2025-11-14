/*
 * @lc app=leetcode.cn id=434 lang=javascript
 *
 * [434] 字符串中的单词数
 */

// @lc code=start
/**
 * @param {string} s
 * @return {number}
 */
var countSegments = function (s) {
  return s.trim().split(/\s+/).filter(Boolean).length;
};
const test = [
  [[""], 0],
  [["Hello"], 1],
  [["Hello, my name is John"], 5],
].forEach(([items, expect]) => {
  const result = countSegments(...items);
  console.log(`结果：${result} ${result.toString() === expect.toString() ? '✅' : '❌'}`);
})
// @lc code=end

