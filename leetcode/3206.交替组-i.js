/*
 * @lc app=leetcode.cn id=3206 lang=javascript
 *
 * [3206] 交替组 I
 */

// @lc code=start
/**
 * @param {number[]} colors
 * @return {number}
 */
var numberOfAlternatingGroups = function (colors) {
  const len = colors.length;
  let res = 0;
  for (let i = 0; i < len; i++) {
    const n1 = colors[i + 1] ?? colors[i + 1 - len];
    const n2 = colors[i + 2] ?? colors[i + 2 - len];
    const n = colors[i];
    if (n1 !== n && n2 !== n1) {
      res++;
    }
  }
  return res;
};
const test = [
  [[[1, 1, 1]], 0],
  [[[0, 1, 0, 0, 1]], 3],
].forEach(([items, expect]) => {
  const result = numberOfAlternatingGroups(...items);
  console.log(`结果：${result} ${result.toString() === expect.toString() ? '✅' : '❌'}`);
})
// @lc code=end

