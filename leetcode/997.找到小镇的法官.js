/*
 * @lc app=leetcode.cn id=997 lang=javascript
 *
 * [997] 找到小镇的法官
 */

// @lc code=start
/**
 * @param {number} n
 * @param {number[][]} trust
 * @return {number}
 */
var findJudge = function (n, trust) {
  const inDegrees = new Array(n + 1).fill(0);
  const outDegrees = new Array(n + 1).fill(0);
  for (const edge of trust) {
    const x = edge[0], y = edge[1];
    ++inDegrees[y];
    ++outDegrees[x];
  }
  for (let i = 1; i <= n; ++i) {
    if (inDegrees[i] === n - 1 && outDegrees[i] === 0) {
      return i;
    }
  }
  return -1;
};
const test = [
  [[2, [[1, 2]]], 2],
  [[3, [[1, 3], [2, 3]]], 3],
  [[3, [[1, 3], [2, 3], [3, 1]]], -1]
].forEach(([items, expect]) => {
  const result = findJudge(...items);
  console.log(`结果：${result} ${result.toString() === expect.toString() ? '✅' : '❌'}`);
})
// @lc code=end

