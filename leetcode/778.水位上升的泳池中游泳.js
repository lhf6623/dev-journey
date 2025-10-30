/*
 * @lc app=leetcode.cn id=778 lang=javascript
 *
 * [778] 水位上升的泳池中游泳
 */

// @lc code=start
const dirs = [
  [0, 1],
  [0, -1],
  [1, 0],
  [-1, 0],
];
/**
 * @param {number[][]} grid
 * @return {number}
 */
var swimInWater = function (grid) {
  // 从小到大，依次遍历
  const n = grid.length;
  let max = Math.max(grid[0][0], grid[n - 1][n - 1]);
  const sort_arr = grid.flat(1).sort((a, b) => a - b).filter(item => item > max)

  while (sort_arr.length) {
    if (dfs(grid, 0, 0, [], max)) return max;
    max = sort_arr.shift();
  }
  return max;
};

function dfs(grid, x, y, visited, max) {
  visited.push(`${x}_${y}`)
  const n = grid.length;
  // 从左上角到右下角
  for (const [dir_x, dir_y] of dirs) {
    const new_x = x + dir_x;
    const new_y = y + dir_y;
    if (inArea(new_x, new_y, n) && !visited.includes(`${new_x}_${new_y}`) && grid[new_x][new_y] <= max) {

      if (new_x == n - 1 && new_y === n - 1) return true
      if (dfs(grid, new_x, new_y, visited, max)) return true
    }

  }
  return false;
}
function inArea(x, y, n) {
  return x >= 0 && x < n && y >= 0 && y < n;
}


const test = [
  [[[6, 22, 3, 23, 1], [14, 8, 7, 16, 5], [11, 0, 9, 15, 18], [24, 4, 2, 13, 19], [20, 10, 17, 21, 12]], 19],
  [[[9, 5, 7, 2], [0, 10, 8, 15], [1, 4, 3, 12], [6, 13, 11, 14]], 14],
  [[[3, 2], [0, 1]], 3],
  [[[0, 2], [1, 3]], 3],
  [[[0, 1, 2, 3, 4], [24, 23, 22, 21, 5], [12, 13, 14, 15, 16], [11, 17, 18, 19, 20], [10, 9, 8, 7, 6]], 16]
]
test.forEach(([item, expect]) => {
  const result = swimInWater(item);
  console.log(`预期: ${expect} 结果: ${result} ${result === expect ? '通过' : '未通过'}`)
})
// @lc code=end

