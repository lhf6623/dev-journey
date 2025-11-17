/*
 * @lc app=leetcode.cn id=1360 lang=javascript
 *
 * [1360] 日期之间隔几天
 */

// @lc code=start
/**
 * @param {string} date1
 * @param {string} date2
 * @return {number}
 */
var daysBetweenDates = function (date1, date2) {
  const [y1, m1, d1] = date1.split("-").map(Number);
  const [y2, m2, d2] = date2.split("-").map(Number);
  date1 = new Date(y1, m1 - 1, d1)
  date2 = new Date(y2, m2 - 1, d2)
  return Math.abs(date1 - date2) / (1000 * 60 * 60 * 24);
};
const test = [
  [["2019-06-29", "2019-06-30"], 1],
  [["2020-01-15", "2019-12-31"], 15],
].forEach(([items, expect]) => {
  const result = daysBetweenDates(...items);
  console.log(`结果：${result} ${result.toString() === expect.toString() ? '✅' : '❌'}`);
})
// @lc code=end

