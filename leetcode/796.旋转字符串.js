/*
 * @lc app=leetcode.cn id=796 lang=javascript
 *
 * [796] 旋转字符串
 */

// @lc code=start
/**
 * @param {string} s
 * @param {string} goal
 * @return {boolean}
 */
var rotateString = function (s, goal) {
  return s.length === goal.length && (s + s).includes(goal);
};
const test = [
  [["abcde", "cdeab"], true],
  [["abcde", "abced"], false],
].forEach(([items, expect]) => {
  const result = rotateString(...items);
  console.log(`结果：${result} ${result.toString() === expect.toString() ? '✅' : '❌'}`);
})
// @lc code=end

