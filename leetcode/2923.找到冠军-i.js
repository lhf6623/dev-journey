/*
 * @lc app=leetcode.cn id=2923 lang=javascript
 *
 * [2923] 找到冠军 I
 */

// @lc code=start
/**
 * @param {number[][]} grid
 * @return {number}
 */
var findChampion = function (grid) {
  // 题目描述
  let res = 0;
  for (let i = 0; i < grid.length; i++) {
    if (grid[i][res]) {
      res = i;
    }
  }
  return res;
  // const n = grid.length;
  // for (let i = 0; i < n; i++) {
  //   const sum = grid[i].reduce((a, b) => a + b, 0);
  //   if (sum === n - 1) {
  //     return i;
  //   }
  // }
  // return -1;
};
const test = [
  [[[0, 1], [0, 0]], 0],
  [[[0, 0, 1], [1, 0, 1], [0, 0, 0]], 1],
]
test.forEach(([args, expect]) => {
  const res = findChampion(args)
  console.log(`测试用例: ${JSON.stringify(args)}: 预期: ${expect} 结果: ${res} ${res === expect ? "通过" : "未通过"}`)
})
// @lc code=end

