/*
 * @lc app=leetcode.cn id=2798 lang=javascript
 *
 * [2798] 满足目标工作时长的员工数目
 */

// @lc code=start
/**
 * @param {number[]} hours
 * @param {number} target
 * @return {number}
 */
var numberOfEmployeesWhoMetTarget = function (hours, target) {
  return hours.filter(hour => hour >= target).length;
};
const test = [
  [[[0, 1, 2, 3, 4], 2], 3],
  [[[5, 1, 4, 2, 2], 6], 0],
]
test.forEach(([items, expect]) => {
  const result = numberOfEmployeesWhoMetTarget(...items);
  console.log(`结果：${result} ${result.toString() === expect.toString() ? '✅' : '❌'}`);
})
// @lc code=end

