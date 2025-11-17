/*
 * @lc app=leetcode.cn id=1354 lang=javascript
 *
 * [1354] 多次求和构造目标数组
 */

// @lc code=start
/**
 * @param {number[]} target
 * @return {boolean}
 */
var isPossible = function (target) {
  target.sort((a, b) => a - b);
  const count = target.length;
  if (count > target.at(-1)) return false;
  if (target[0] === 1) return true;
  while (target.at(-1) > 1) {
    let sun = target.reduce((a, b) => a + b, 0);
    sun -= target.at(-1);
    target[target.length - 1] = target.at(-1) - sun;
    target.sort((a, b) => a - b);
    if (target[0] < 1) break;
  }
  return target.at(-1) === 1 && target[0] === 1;
};
// 求 1 1 2 3 5 8 13 式子

const test = [
  [[[2, 900000001]], true],
  [[[1, 1000000000]], true],
  [[[9, 3, 5]], true],
  [[[1, 1, 1, 2]], false],
  [[[8, 5]], true],
].forEach(([items, expect]) => {
  const result = isPossible(...items);
  console.log(`结果：${result} ${result.toString() === expect.toString() ? '✅' : '❌'}`);
})
// @lc code=end

