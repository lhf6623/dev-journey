/*
 * @lc app=leetcode.cn id=2965 lang=javascript
 *
 * [2965] 找出缺失和重复的数字
 */

// @lc code=start
/**
 * @param {number[][]} grid
 * @return {number[]}
 */
var findMissingAndRepeatedValues = function (grid) {
  const set = new Set();
  const row = grid.length;
  const n = row * row;
  let num = 0;
  let a = null;
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < row; j++) {
      const v = grid[i][j];
      if (!set.has(v)) {
        num += v;
        set.add(v);
      } else {
        a = v;
      }
    }
  }
  return [a, (n * (n + 1)) / 2 - num];
};
const test = [
  [[[1, 3], [2, 2]], [2, 4]],
  [[[9, 1, 7], [8, 9, 2], [3, 4, 6]], [9, 5]],
]
test.forEach(([args, expect]) => {
  const res = findMissingAndRepeatedValues(args)
  const resStr = res.toString();
  const argsStr = args.toString();
  const expectStr = expect.toString();
  console.log(`测试用例: ${argsStr}: 预期: ${expectStr} 结果: ${resStr} ${resStr === expectStr ? "通过" : "未通过"}`)
})
// @lc code=end

// n 的乘阶 数学方程解



