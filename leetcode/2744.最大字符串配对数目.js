/*
 * @lc app=leetcode.cn id=2744 lang=javascript
 *
 * [2744] 最大字符串配对数目
 */

// @lc code=start
/**
 * @param {string[]} words
 * @return {number}
 */
var maximumNumberOfStringPairs = function (words) {
  let count = 0;
  const _words = words.map(item => item.split('').reverse().join(''));
  for (let i = 0; i < words.length; i++) {
    for (let j = i + 1; j < words.length; j++) {
      if (words[i] === _words[j]) {
        count++;
      }
    }
  }
  return count;
};
const test = [
  [[["cd", "ac", "dc", "ca", "zz"]], 2],
  [[["ab", "ba", "cc"]], 1],
  [[["aa", "ab"]], 0],
].forEach(([items, expect]) => {
  const result = maximumNumberOfStringPairs(...items);
  console.log(`结果：${result} ${result.toString() === expect.toString() ? '✅' : '❌'}`);
})
// @lc code=end

