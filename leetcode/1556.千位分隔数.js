/*
 * @lc app=leetcode.cn id=1556 lang=javascript
 *
 * [1556] 千位分隔数
 */

// @lc code=start
/**
 * @param {number} n
 * @return {string}
 */
var thousandSeparator = function (n) {
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};
const test = [
  [[987], "987"],
  [[1234], "1.234"],
  [[123456789], "123.456.789"],
  [[0], '0'],
].forEach(([items, expect]) => {
  const result = thousandSeparator(...items);
  console.log(`结果：${result} ${result.toString() === expect.toString() ? '✅' : '❌'}`);
})
// @lc code=end

