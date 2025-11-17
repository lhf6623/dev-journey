/*
 * @lc app=leetcode.cn id=1496 lang=javascript
 *
 * [1496] 判断路径是否相交
 */

// @lc code=start
/**
 * @param {string} path
 * @return {boolean}
 */
var isPathCrossing = function (path) {
  let x = 0,
    y = 0;
  const set = new Set([`${x},${y}`]);
  for (let i = 0; i < path.length; i++) {
    switch (path[i]) {
      case 'N':
        y++;
        break;
      case 'S':
        y--;
        break;
      case 'E':
        x++;
        break;
      case 'W':
        x--;
        break;
    }
    if (set.has(`${x},${y}`)) return true;
    set.add(`${x},${y}`);
  }
  return false;
};
const test = [
  [["NES"], false],
  [["NESWW"], true],
].forEach(([items, expect]) => {
  const result = isPathCrossing(...items);
  console.log(`结果：${result} ${result.toString() === expect.toString() ? '✅' : '❌'}`);
})
// @lc code=end

