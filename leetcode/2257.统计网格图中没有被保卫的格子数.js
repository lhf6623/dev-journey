/*
 * @lc app=leetcode.cn id=2257 lang=javascript
 *
 * [2257] 统计网格图中没有被保卫的格子数
 */

// @lc code=start  
const dirs = [
  [0, 1],
  [0, -1],
  [1, 0],
  [-1, 0]
];
/**
 * @param {number} m
 * @param {number} n
 * @param {number[][]} guards
 * @param {number[][]} walls
 * @return {number}
 */
var countUnguarded = function (m, n, guards, walls) {
  let res = m * n - guards.length - walls.length;

  const map = new Array(m).fill(0).map(() => new Array(n).fill(0));
  for (const [y, x] of walls) {
    map[y][x] = 'w';
  }
  for (const [y, x] of guards) {
    map[y][x] = 'g';
  }

  for (const [y, x] of guards) {
    for (let i = 0; i < dirs.length; i++) {
      let [dy, dx] = dirs[i];

      while (y + dy >= 0 && y + dy < m && x + dx >= 0 && x + dx < n && !(map[y + dy][x + dx] > 'a')) {
        if (map[y + dy][x + dx] === 0) {
          res -= 1
          map[y + dy][x + dx] += 1;
        }
        dy += dirs[i][0];
        dx += dirs[i][1];
      }
    }
  }
  return res;
};
const test = [
  [[4, 6, [[0, 0], [1, 1], [2, 3]], [[0, 1], [2, 2], [1, 4]]], 7],
  [[3, 3, [[1, 1]], [[0, 1], [1, 0], [2, 1], [1, 2]]], 4],
].forEach(([items, expect]) => {
  const result = countUnguarded(...items);
  console.log(`结果：${result} ${result.toString() === expect.toString() ? '✅' : '❌'}`);
})
// @lc code=end

