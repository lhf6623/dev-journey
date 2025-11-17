/*
 * @lc app=leetcode.cn id=830 lang=javascript
 *
 * [830] 较大分组的位置
 */

// @lc code=start
/**
 * @param {string} s
 * @return {number[][]}
 */
var largeGroupPositions = function (s) {
  let i = 0,
    j = 0;
  const res = [];
  while (j < s.length) {
    while (j < s.length && s[j] === s[i]) j++;
    if (j - i >= 3) res.push([i, j - 1]);
    i = j;
  }
  return res;
};
const test = [
  [["abbxxxxzzy"], [[3, 6]]],
  [["abc"], []],
  [["abcdddeeeeaabbbcd"], [[3, 5], [6, 9], [12, 14]]],
  [["aba"], []],
].forEach(([items, expect]) => {
  const result = largeGroupPositions(...items);
  console.log(`结果：${result} ${result.toString() === expect.toString() ? '✅' : '❌'}`);
})
// @lc code=end

