/*
 * @lc app=leetcode.cn id=1252 lang=javascript
 *
 * [1252] 奇数值单元格的数目
 */

// @lc code=start
/**
 * @param {number} m
 * @param {number} n
 * @param {number[][]} indices
 * @return {number}
 */
var oddCells = function (m, n, indices) {
  const matrix = new Array(m).fill(0).map(() => new Array(n).fill(0));

  for (const [r, c] of indices) {
    for (let i = 0; i < n; i++) {
      matrix[r][i]++;
    }
    for (let i = 0; i < m; i++) {
      matrix[i][c]++;
    }
  }
  return matrix.flat(1).filter(item => item % 2).length;
};
const test = [
  [[2, 3, [[0, 1], [1, 1]]], 6],
  [[2, 2, [[1, 1], [0, 0]]], 0],
].forEach(([items, expect]) => {
  const result = oddCells(...items);
  console.log(`结果：${result} ${result.toString() === expect.toString() ? '✅' : '❌'}`);
})
// @lc code=end

