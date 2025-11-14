/*
 * @lc app=leetcode.cn id=168 lang=javascript
 *
 * [168] Excel 表列名称
 */

// @lc code=start
/**
 * @param {number} columnNumber
 * @return {string}
 */
var convertToTitle = function (columnNumber) {
  let ans = '';
  while (columnNumber > 0) {
    columnNumber--;
    ans = String.fromCharCode(columnNumber % 26 + 'A'.charCodeAt()) + ans;
    columnNumber = Math.floor(columnNumber / 26);
  }
  return ans;
};
const test = [
  [[1], "A"],
  [[28], "AB"],
  [[701], "ZY"],
  [[2147483647], "FXSHRXW"],
].forEach(([items, expect]) => {
  const result = convertToTitle(...items);
  console.log(`结果：${result} ${result.toString() === expect.toString() ? '✅' : '❌'}`);
})
// @lc code=end

