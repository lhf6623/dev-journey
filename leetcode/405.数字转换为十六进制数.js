/*
 * @lc app=leetcode.cn id=405 lang=javascript
 *
 * [405] 数字转换为十六进制数
 */

// @lc code=start
/**
 * @param {number} num
 * @return {string}
 */
var toHex = function (num) {
  if (num === 0) return "0";
  let res = "";
  while (num) {
    res = (num & 15).toString(16) + res;
    num >>>= 4;
  }
  return res;
};
const test = [
  [[26], "1a"],
  [[-1], "ffffffff"],
].forEach(([items, expect]) => {
  const result = toHex(...items);
  console.log(`结果：${result} ${result.toString() === expect.toString() ? '✅' : '❌'}`);
})
// @lc code=end

