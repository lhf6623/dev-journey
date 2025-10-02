/*
 * @lc app=leetcode.cn id=1450 lang=javascript
 *
 * [1450] 在既定时间做作业的学生人数
 */

// @lc code=start
/**
 * @param {number[]} startTime
 * @param {number[]} endTime
 * @param {number} queryTime
 * @return {number}
 */
var busyStudent = function (startTime, endTime, queryTime) {
  return startTime.filter((item, i) => item <= queryTime && endTime[i] >= queryTime).length
};
const test = [
  [[[1, 2, 3], [3, 2, 7], 4], 1],
  [[[4], [4], 4], 1],
  [[[4], [4], 5], 0],
  [[[1, 1, 1, 1], [1, 3, 2, 4], 7], 0],
  [[[9, 8, 7, 6, 5, 4, 3, 2, 1], [10, 10, 10, 10, 10, 10, 10, 10, 10], 5], 5]
]
test.forEach(([item, expect]) => {
  const result = busyStudent(...item);
  console.log(result === expect ? "测试成功" : "测试失败")
})
// @lc code=end

