/*
 * @lc app=leetcode.cn id=3280 lang=javascript
 *
 * [3280] 将日期转换为二进制表示
 */

// @lc code=start
/**
 * @param {string} date
 * @return {string}
 */
var convertDateToBinary = function (date) {
  return date.split('-').map(num => Number(num).toString(2)).join('-');
};
const test = [
  [["2080-02-29"], "100000100000-10-11101"],
  [["1900-01-01"], "11101101100-1-1"],
].forEach(([items, expect]) => {
  const result = convertDateToBinary(...items);
  console.log(`结果：${result} ${result.toString() === expect.toString() ? '✅' : '❌'}`);
})
// @lc code=end

