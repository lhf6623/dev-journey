/*
 * @lc app=leetcode.cn id=717 lang=javascript
 *
 * [717] 1 比特与 2 比特字符
 */

// @lc code=start
/**
 * @param {number[]} bits
 * @return {boolean}
 */
var isOneBitCharacter = function (bits) {
  let i = 0;
  while (i < bits.length - 1) {
    i += bits[i] + 1;
  }
  return i === bits.length - 1;
};
const test = [
  [[[1, 0, 0]], true],
  [[[1, 1, 1, 0]], false],
].forEach(([items, expect]) => {
  const result = isOneBitCharacter(...items);
  console.log(`结果：${result} ${result.toString() === expect.toString() ? '✅' : '❌'}`);
})
// @lc code=end

