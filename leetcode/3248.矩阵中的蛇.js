/*
 * @lc app=leetcode.cn id=3248 lang=javascript
 *
 * [3248] 矩阵中的蛇
 */

// @lc code=start
/**
 * @param {number} n
 * @param {string[]} commands
 * @return {number}
 */
var finalPositionOfSnake = function (n, commands) {
  let x = 0,
    y = 0;
  while (commands.length) {
    const command = commands.shift();
    if (command === 'RIGHT') {
      x++;
    } else if (command === 'LEFT') {
      x--;
    } else if (command === 'UP') {
      y--;
    } else if (command === 'DOWN') {
      y++;
    }
  }
  return y * n + x;
};
const test = [
  [[2, ["RIGHT", "DOWN"]], 3],
  [[3, ["DOWN", "RIGHT", "UP"]], 1],
].forEach(([items, expect]) => {
  const result = finalPositionOfSnake(...items);
  console.log(`结果：${result} ${result.toString() === expect.toString() ? '✅' : '❌'}`);
})
// @lc code=end

