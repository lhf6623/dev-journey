/*
 * @lc app=leetcode.cn id=1578 lang=javascript
 *
 * [1578] 使绳子变成彩色的最短时间
 */

// @lc code=start
/**
 * @param {string} colors
 * @param {number[]} neededTime
 * @return {number}
 */
var minCost = function (colors, neededTime) {
  let res = 0;
  let i = 0;
  while (i < colors.length) {
    let maxTime = neededTime[i];
    let j = i + 1;
    while (j < colors.length && colors[j] === colors[i]) {
      if (neededTime[j] < maxTime) {
        res += neededTime[j]
      } else {
        res += maxTime
        maxTime = neededTime[j]
      }
      j++;
    }
    i = j;
  }
  return res
};
const test = [
  [["cddcdcae", [4, 8, 8, 4, 4, 5, 4, 2]], 8],
  [["abaac", [1, 2, 3, 4, 5]], 3],
  [["abc", [1, 2, 3]], 0],
  [["aabaa", [1, 2, 3, 4, 1]], 2]
].forEach(([items, expect]) => {
  const result = minCost(...items);
  console.log(`结果：${result} ${result.toString() === expect.toString() ? '✅' : '❌'}`);
})
// @lc code=end

