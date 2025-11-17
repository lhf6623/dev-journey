/*
 * @lc app=leetcode.cn id=1078 lang=javascript
 *
 * [1078] Bigram 分词
 */

// @lc code=start
/**
 * @param {string} text
 * @param {string} first
 * @param {string} second
 * @return {string[]}
 */
var findOcurrences = function (text, first, second) {
  const arr = text.split(' ');
  const result = [];
  for (let i = 0; i < arr.length - 2; i++) {
    if (arr[i] === first && arr[i + 1] === second) {
      result.push(arr[i + 2]);
    }
  }
  return result;
};
const test = [
  [["alice is a good girl she is a good student", "a", "good"], ["girl", "student"]],
  [["we will we will rock you", "we", "will"], ["we", "rock"]],
].forEach(([items, expect]) => {
  const result = findOcurrences(...items);
  console.log(`结果：${result} ${result.toString() === expect.toString() ? '✅' : '❌'}`);
})
// @lc code=end

