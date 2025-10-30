/*
 * @lc app=leetcode.cn id=733 lang=javascript
 *
 * [733] 图像渲染
 */

// @lc code=start
const dirs = [
  [0, 1],
  [0, -1],
  [1, 0],
  [-1, 0],
];
/**
 * @param {number[][]} image
 * @param {number} sr
 * @param {number} sc
 * @param {number} color
 * @return {number[][]}
 */
var floodFill = function (image, sr, sc, color) {
  const target = image[sr][sc];
  if (target === color) return image;
  image[sr][sc] = color;

  function dfs(y, x) {
    for (const [dir_x, dir_y] of dirs) {
      const new_x = x + dir_x;
      const new_y = y + dir_y;
      if (inArea(new_x, new_y) && image[new_y][new_x] === target) {
        image[new_y][new_x] = color;
        dfs(new_y, new_x);
      }
    }
  }

  function inArea(x, y) {
    return x >= 0 && x < image[0].length && y >= 0 && y < image.length;
  }
  dfs(sr, sc);

  return image
};


/**
 * [[0, 0, 0], 
 *  [0, 0, 0]]
 */
const test = [
  [[[[0, 0, 0], [0, 0, 0]], 1, 0, 2], [[2, 2, 2], [2, 2, 2]]],
  [[[[1, 1, 1], [1, 1, 0], [1, 0, 1]], 1, 1, 2], [[2, 2, 2], [2, 2, 0], [2, 0, 1]]],
  [[[[0, 0, 0], [0, 0, 0]], 0, 0, 0], [[0, 0, 0], [0, 0, 0]]]
]
test.forEach(([items, expect]) => {
  const result = floodFill(...items);
  console.log(`结果：${JSON.stringify(result)} ${result.toString() === expect.toString() ? '✅' : '❌'}`);
})
// @lc code=end

