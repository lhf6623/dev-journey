/*
 * @lc app=leetcode.cn id=2942 lang=javascript
 *
 * [2942] 查找包含给定字符的单词
 */

// @lc code=start
/**
 * @param {string[]} words
 * @param {character} x
 * @return {number[]}
 */
var findWordsContaining = function (words, x) {
  // 1ms 90.91% 58.85MB 23.86%
  return words.reduce((acc, item, i) => (item.includes(x) && acc.push(i), acc), [])
  // 3ms 21.59% 57.35MB 97.73%
  // return words.flatMap((item, i) => item.includes(x) ? [i] : [])
};

const test = [
  [[["leet", "code"], "e"], [0, 1]],
  [[["abc", "bcd", "aaaa", "cbc"], "a"], [0, 2]],
  [[["abc", "bcd", "aaaa", "cbc"], "z"], []],
]
test.forEach(([items, expect]) => {
  const result = findWordsContaining(...items);
  console.log(`结果：${result} ${result.toString() === expect.toString() ? '✅' : '❌'}`);
})
// @lc code=end

