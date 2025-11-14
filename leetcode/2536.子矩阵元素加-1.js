/*
 * @lc app=leetcode.cn id=2536 lang=javascript
 *
 * [2536] 子矩阵元素加 1
 */

// @lc code=start
/**
 * @param {number} n
 * @param {number[][]} queries
 * @return {number[][]}
 */
var rangeAddQueries = function (n, queries) {
  const res = Array.from({ length: n }, () => Array(n).fill(0));
  for (const [r1, c1, r2, c2] of queries) {
    for (let i = r1; i <= r2; ++i) {
      for (let j = c1; j <= c2; ++j) {
        res[i][j]++;
      }
    }
  }
  return res;
};
const test = [
  [[3, [[1, 1, 2, 2], [0, 0, 1, 1]]], [[1, 1, 0], [1, 2, 1], [0, 1, 1]]],
  [[2, [[0, 0, 1, 1]]], [[1, 1], [1, 1]]],
].forEach(([items, expect]) => {
  const result = rangeAddQueries(...items);
  console.log(`结果：${result} ${result.toString() === expect.toString() ? '✅' : '❌'}`);
})
// @lc code=end

