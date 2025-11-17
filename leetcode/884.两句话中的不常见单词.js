/*
 * @lc app=leetcode.cn id=884 lang=javascript
 *
 * [884] 两句话中的不常见单词
 */

// @lc code=start
/**
 * @param {string} s1
 * @param {string} s2
 * @return {string[]}
 */
var uncommonFromSentences = function (s1, s2) {
  const map = new Map();
  const s = s1 + ' ' + s2;
  for (const item of s.split(' ')) {
    map.set(item, (map.get(item) || 0) + 1);
  }
  return [...map.entries()].filter(([_, value]) => value === 1).map(([key]) => key);
};
const test = [
  [["this apple is sweet", "this apple is sour"], ["sweet", "sour"]],
  [["apple apple", "banana"], ["banana"]],
].forEach(([items, expect]) => {
  const result = uncommonFromSentences(...items);
  console.log(`结果：${result} ${result.toString() === expect.toString() ? '✅' : '❌'}`);
})
// @lc code=end

