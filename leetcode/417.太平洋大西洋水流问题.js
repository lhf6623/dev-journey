/*
 * @lc app=leetcode.cn id=417 lang=javascript
 *
 * [417] 太平洋大西洋水流问题
 */

// @lc code=start
/**
 * @param {number[][]} heights
 * @return {number[][]}
 */
const dirs = [[-1, 0], [1, 0], [0, -1], [0, 1]];
var pacificAtlantic = function (heights) {
  // 广度优先搜索
  let m = heights.length;
  let n = heights[0].length;
  const pacific = new Array(m).fill(0).map(() => new Array(n).fill(0));
  const atlantic = new Array(m).fill(0).map(() => new Array(n).fill(0));

  const bfs = (row, col, ocean) => {
    if (ocean[row][col]) {
      return;
    }
    ocean[row][col] = true;
    const queue = [];
    queue.push([row, col]);
    while (queue.length) {
      const cell = queue.shift();
      for (const dir of dirs) {
        const newRow = cell[0] + dir[0], newCol = cell[1] + dir[1];
        if (newRow >= 0 && newRow < m && newCol >= 0 && newCol < n && heights[newRow][newCol] >= heights[cell[0]][cell[1]] && !ocean[newRow][newCol]) {
          ocean[newRow][newCol] = true;
          queue.push([newRow, newCol]);
        }
      }
    }
  };

  for (let i = 0; i < m; i++) {
    bfs(i, 0, pacific);
  }
  for (let j = 1; j < n; j++) {
    bfs(0, j, pacific);
  }
  for (let i = 0; i < m; i++) {
    bfs(i, n - 1, atlantic);
  }
  for (let j = 0; j < n - 1; j++) {
    bfs(m - 1, j, atlantic);
  }
  const result = [];
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (pacific[i][j] && atlantic[i][j]) {
        const cell = [];
        cell.push(i);
        cell.push(j);
        result.push(cell);
      }
    }
  }
  return result;
}

const test = [
  [[[1, 2, 2, 3, 5], [3, 2, 3, 4, 4], [2, 4, 5, 3, 1], [6, 7, 1, 4, 5], [5, 1, 1, 2, 4]], [[0, 4], [1, 3], [1, 4], [2, 2], [3, 0], [3, 1], [4, 0]]],
  [[[1]], [[0, 0]]]
]

test.forEach(([item, expect]) => {
  const result = pacificAtlantic(item);
  console.log(result);
  console.log('===')
  console.log(expect);
})
// @lc code=end

