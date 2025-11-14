/*
 * @lc app=leetcode.cn id=1232 lang=javascript
 *
 * [1232] 缀点成线
 */

// @lc code=start
/**
 * @param {number[][]} coordinates
 * @return {boolean}
 */
var checkStraightLine = function (coordinates) {
  const [[x1, y1], [x2, y2]] = coordinates;
  // 横线
  let col = coordinates[0][0];
  // 竖线
  let row = coordinates[0][1];
  // 斜率
  let ratio = (y2 - y1) / (x2 - x1);

  for (let i = 1; i < coordinates.length; i++) {
    const [x, y] = coordinates[i];
    if (col !== false && col !== x) {
      col = false;
    }
    if (row !== false && row !== y) {
      row = false;
    }
    if (ratio !== false && ratio !== (y - y1) / (x - x1)) {
      ratio = false;
    }

    if (col === false && row === false && ratio === false) return false;
  }
  return col === false || row === false || ratio === false
};
const test = [
  [[[[1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7]]], true],
  [[[[1, 1], [2, 2], [3, 4], [4, 5], [5, 6], [7, 7]]], false],
].forEach(([items, expect]) => {
  const result = checkStraightLine(...items);
  console.log(`结果：${result} ${result.toString() === expect.toString() ? '✅' : '❌'}`);
})
// @lc code=end

