/*
 * @lc app=leetcode.cn id=1507 lang=javascript
 *
 * [1507] 转变日期格式
 */

// @lc code=start
/**
 * @param {string} date
 * @return {string}
 */
var reformatDate = function (date) {
  const [_date, month, year] = date.split(' ');
  const monthMap = {
    Jan: '01',
    Feb: '02',
    Mar: '03',
    Apr: '04',
    May: '05',
    Jun: '06',
    Jul: '07',
    Aug: '08',
    Sep: '09',
    Oct: '10',
    Nov: '11',
    Dec: '12'
  }
  return [year, monthMap[month].padStart(2, "0"), _date.slice(0, -2).padStart(2, "0")].join('-');
};
const test = [
  [["20th Oct 2052"], "2052-10-20"],
  [["6th Jun 1933"], "1933-06-06"],
  [["26th May 1960"], "1960-05-26"],
].forEach(([items, expect]) => {
  const result = reformatDate(...items);
  console.log(`结果：${result} ${result.toString() === expect.toString() ? '✅' : '❌'}`);
})
// @lc code=end

