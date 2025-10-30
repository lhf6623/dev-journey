/*
 * @lc app=leetcode.cn id=2643 lang=javascript
 *
 * [2643] 一最多的行
 */

// @lc code=start
/**
 * @param {number[][]} mat
 * @return {number[]}
 */
var rowAndMaximumOnes = function (mat) {
  return mat.reduce((acc, row, i) => {
    const count = row.reduce((acc, val) => acc + val, 0);
    if (count > acc[1]) {
      return [i, count];
    }
    return acc;
  }, [0, 0])
};
const test = [
  [[[[0, 1], [1, 0]]], [0, 1]],
  [[[[0, 0, 0], [0, 1, 1]]], [1, 2]],
  [[[[0, 0], [1, 1], [0, 0]]], [1, 2]]
].forEach(([items, expect]) => {
  const result = rowAndMaximumOnes(...items);
  console.log(`结果：${result} ${result.toString() === expect.toString() ? '✅' : '❌'}`);
})
// @lc code=end

