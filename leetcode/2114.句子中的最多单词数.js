/*
 * @lc app=leetcode.cn id=2114 lang=javascript
 *
 * [2114] 句子中的最多单词数
 */

// @lc code=start
/**
 * @param {string[]} sentences
 * @return {number}
 */
var mostWordsFound = function (sentences) {
  return Math.max(...sentences.map(item => item.split(' ').length));
};
const test = [
  [[["alice and bob love leetcode", "i think so too", "this is great thanks very much"]], 6],
  [[["please wait", "continue to fight", "continue to win"]], 3],
].forEach(([items, expect]) => {
  const result = mostWordsFound(...items);
  console.log(`结果：${result} ${result.toString() === expect.toString() ? '✅' : '❌'}`);
})
// @lc code=end

