/*
 * @lc app=leetcode.cn id=2500 lang=javascript
 *
 * [2500] 删除每行中的最大值
 */

// @lc code=start
/**
 * @param {number[][]} grid
 * @return {number}
 */
var deleteGreatestValue = function (grid) {
  let res = 0;
  const col = grid[0].length;
  const row = grid.length;

  for (let i = 0; i < row; i++) {
    grid[i].sort((a, b) => b - a)
  }
  for (let i = 0; i < col; i++) {
    const maxs = []
    for (let j = 0; j < row; j++) {
      maxs.push(grid[j][i]);
    }
    res += Math.max(...maxs);
  }
  return res;
};
const test = [
  [[[1, 2, 4], [3, 3, 1]], 8],
  [[[10]], 10]
]

test.forEach(([args, expect]) => {
  const res = deleteGreatestValue(args)
  console.log(`测试用例: ${JSON.stringify(args)}: 预期: ${expect} 结果: ${res} ${res === expect ? "通过" : "未通过"}`)
})
// @lc code=end

