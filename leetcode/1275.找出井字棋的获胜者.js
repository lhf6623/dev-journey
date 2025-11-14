/*
 * @lc app=leetcode.cn id=1275 lang=javascript
 *
 * [1275] 找出井字棋的获胜者
 */

// @lc code=start
/**
 * @param {number[][]} moves
 * @return {string}
 */
var tictactoe = function (moves) {
  const d = [
    [1, 0],// 竖 y x
    [0, 1],// 横
    [1, 1],// 斜 /
    [1, -1]// 斜 \
  ]
  const map = new Array(3).fill().map(() => new Array(3).fill(' '));

  for (let i = 0; i < moves.length; i++) {
    const [y, x] = moves[i];
    map[y][x] = i % 2 === 0 ? 'A' : 'B';
  }

  for (let i = 0; i < moves.length; i++) {
    const [y, x] = moves[i];
    const key = map[y][x];

    for (let j = 0; j < d.length; j++) {
      const [dy, dx] = d[j];
      let [y1, x1] = [y, x];
      let count = 0;
      let dir = -1;

      while (map[y1]?.[x1] === key && dir < 2) {
        count++;
        y1 += dy * dir;
        x1 += dx * dir;
        // 往另一个方向寻找
        if (map[y1]?.[x1] !== key) {
          dir += 2;
          y1 = dy + y * dir;
          x1 = dx + x * dir;
        }
      }
      if (count >= 3) return key;
    }
  }
  return moves.length < 9 ? "Pending" : "Draw"
};
const test = [
  [[[[0, 0], [2, 0], [1, 1], [2, 1], [2, 2]]], "A"],
  [[[[0, 0], [1, 1], [0, 1], [0, 2], [1, 0], [2, 0]]], "B"],
  [[[[0, 0], [1, 1], [2, 0], [1, 0], [1, 2], [2, 1], [0, 1], [0, 2], [2, 2]]], "Draw"]
].forEach(([items, expect]) => {
  const result = tictactoe(...items);
  console.log(`结果：${result} ${result.toString() === expect.toString() ? '✅' : '❌'}`);
})
// @lc code=end

