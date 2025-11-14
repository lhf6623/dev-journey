/*
 * @lc app=leetcode.cn id=504 lang=javascript
 *
 * [504] 七进制数
 */

// @lc code=start
/**
 * @param {number} num
 * @return {string}
 */
var convertToBase7 = function (num) {
  return num.toString(7);
};
const test = [
  [[100], "202"],
  [[-7], "-10"],
].forEach(([items, expect]) => {
  const result = convertToBase7(...items);
  console.log(`结果：${result} ${result.toString() === expect.toString() ? '✅' : '❌'}`);
})
// @lc code=end

