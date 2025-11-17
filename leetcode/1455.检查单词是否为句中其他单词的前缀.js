/*
 * @lc app=leetcode.cn id=1455 lang=javascript
 *
 * [1455] 检查单词是否为句中其他单词的前缀
 */

// @lc code=start
/**
 * @param {string} sentence
 * @param {string} searchWord
 * @return {number}
 */
var isPrefixOfWord = function (sentence, searchWord) {
  let index = 1;
  for (const word of sentence.split(" ")) {
    if (word.startsWith(searchWord)) {
      return index;
    }
    index++;
  }
  return -1;
};
const test = [
  [["i love eating burger", "burg"], 4],
  [["this problem is an easy problem", "pro"], 2],
  [["i am tired", "you"], -1],
].forEach(([items, expect]) => {
  const result = isPrefixOfWord(...items);
  console.log(`结果：${result} ${result.toString() === expect.toString() ? '✅' : '❌'}`);
})
// @lc code=end

