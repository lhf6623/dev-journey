/*
 * @lc app=leetcode.cn id=1189 lang=javascript
 *
 * [1189] “气球” 的最大数量
 */

// @lc code=start
/**
 * @param {string} text
 * @return {number}
 */
var maxNumberOfBalloons = function (text) {
  const map = new Map();
  for (const char of text) {
    map.set(char, (map.get(char) || 0) + 1);
  }
  return Math.min(
    map.get("b") || 0,
    map.get("a") || 0,
    map.get("l") / 2 || 0,
    map.get("o") / 2 || 0,
    map.get("n") || 0
  ) | 0;
};
const test = [
  [["balon"], 0],
  [["nlaebolko"], 1],
  [["loonbalxballpoon"], 2],
  [["leetcode"], 0],
].forEach(([items, expect]) => {
  const result = maxNumberOfBalloons(...items);
  console.log(`结果：${result} ${result.toString() === expect.toString() ? '✅' : '❌'}`);
})
// @lc code=end

