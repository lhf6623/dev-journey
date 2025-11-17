/*
 * @lc app=leetcode.cn id=657 lang=javascript
 *
 * [657] 机器人能否返回原点
 */

// @lc code=start
/**
 * @param {string} moves
 * @return {boolean}
 */
var judgeCircle = function (moves) {
  let x = 0,
    y = 0;
  for (let i = 0; i < moves.length; i++) {
    switch (moves[i]) {
      case "U":
        y++;
        break;
      case "D":
        y--;
        break;
      case "L":
        x--;
        break;
      case "R":
        x++;
        break;
    }
  }
  return x === 0 && y === 0;
};
const test = [
  [["UD"], true],
  [["LL"], false],
].forEach(([items, expect]) => {
  const result = judgeCircle(...items);
  console.log(`结果：${result} ${result.toString() === expect.toString() ? '✅' : '❌'}`);
})
// @lc code=end

