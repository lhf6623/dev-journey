/*
 * @lc app=leetcode.cn id=1611 lang=javascript
 *
 * [1611] 使整数变为 0 的最少操作次数
 */

// @lc code=start
/**
 * @param {number} n
 * @return {number}
 */
var minimumOneBitOperations = function (n) {
  if (n === 0) {
    return 0;
  }
  const x = Math.floor(Math.log2(n));
  return (1 << (x + 1)) - 1 - minimumOneBitOperations(n - (1 << x));
};

const test = [
  [[3], 2],
  [[6], 4],
].forEach(([items, expect]) => {
  const result = minimumOneBitOperations(...items);
  console.log(`结果：${result} ${result.toString() === expect.toString() ? '✅' : '❌'}`);
})
// @lc code=end

