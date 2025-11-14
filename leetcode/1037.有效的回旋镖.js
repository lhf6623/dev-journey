/*
 * @lc app=leetcode.cn id=1037 lang=javascript
 *
 * [1037] 有效的回旋镖
 */

// @lc code=start
/**
 * @param {number[][]} points
 * @return {boolean}
 */
var isBoomerang = function (points) {
  const [[x1, y1], [x2, y2], [x3, y3]] = points;
  const obj = {};
  for (let i = 0; i < 3; i++) {
    const key = points[i].join('-')
    if (obj[key]) return false;
    obj[key] = true;
  }

  // 横线判断
  if (y1 === y2 && y2 === y3 && y1 === y3) return false;
  // 竖线判断
  if (x1 === x2 && x2 === x3 && x1 === x3) return false;
  // 斜率判断
  if ((y3 - y1) / (x3 - x1) === (y2 - y1) / (x2 - x1)) return false;

  return true
};
const test = [
  [[[[0, 1], [1, 0], [0, 1]]], false],
  [[[[0, 0], [0, 2], [2, 1]]], true],
  [[[[1, 1], [2, 3], [3, 2]]], true],
  [[[[1, 1], [2, 2], [3, 3]]], false],
].forEach(([items, expect]) => {
  const result = isBoomerang(...items);
  console.log(`结果：${result} ${result.toString() === expect.toString() ? '✅' : '❌'}`);
})
// @lc code=end

