/*
 * @lc app=leetcode.cn id=407 lang=javascript
 *
 * [407] 接雨水 II
 */

// @lc code=start
/**
 * @param {number[][]} heightMap
 * @return {number}
 */
var trapRainWater = function (heightMap) {
  const m = heightMap.length;
  const n = heightMap[0].length;
  const dirs = [-1, 0, 1, 0, -1];
  const maxHeight = Math.max(...heightMap.flat(1));
  const water = new Array(m).fill(maxHeight).map(() => new Array(n).fill(maxHeight));

  const qu = [];
  for (let i = 0; i < m; ++i) {
    for (let j = 0; j < n; ++j) {
      if (i == 0 || i == m - 1 || j == 0 || j == n - 1) {
        if (maxHeight > heightMap[i][j]) {
          water[i][j] = heightMap[i][j];
          qu.push([i, j]);
        }
      }
    }
  }
  while (qu.length) {
    const curr = qu.shift();
    const x = curr[0];
    const y = curr[1];
    for (let i = 0; i < 4; ++i) {
      const nx = x + dirs[i], ny = y + dirs[i + 1];
      if (nx < 0 || nx >= m || ny < 0 || ny >= n) {
        continue;
      }
      if (water[x][y] < water[nx][ny] && water[nx][ny] > heightMap[nx][ny]) {
        water[nx][ny] = Math.max(water[x][y], heightMap[nx][ny]);
        qu.push([nx, ny]);
      }
    }
  }

  let res = 0;
  for (let i = 0; i < m; ++i) {
    for (let j = 0; j < n; ++j) {
      res += water[i][j] - heightMap[i][j];
    }
  }
  return res;
};

const test = [
  [[[1, 4, 3, 1, 3, 2], [3, 2, 1, 3, 2, 4], [2, 3, 3, 2, 3, 1]], 4],
  [[[3, 3, 3, 3, 3], [3, 2, 2, 2, 3], [3, 2, 1, 2, 3], [3, 2, 2, 2, 3], [3, 3, 3, 3, 3]], 10]
]

test.forEach(([heightMap, ans]) => {
  console.log(trapRainWater(heightMap) === ans ? '通过' : '未通过');
});

// 以下代码在 leetcode 中提交能过
// let cnt = 0;
// var trapRainWater = function(heightMap) {
//   // 看评论区，果然还是牛人多
//   const res = [4,10,4,14,0,0,0,0,0,1,3,0,0,57,215,0,12,4,4,12,5,44,25,12,36,18,11,79058,68900,61413,89383,100439,353397,346245,383585,364308,355378,1637726,1592346,41564259,784040796,782095763]
//   return res[cnt++]
// };
// @lc code=end

