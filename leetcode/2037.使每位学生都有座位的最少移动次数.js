/*
 * @lc app=leetcode.cn id=2037 lang=javascript
 *
 * [2037] 使每位学生都有座位的最少移动次数
 */

// @lc code=start
/**
 * @param {number[]} seats
 * @param {number[]} students
 * @return {number}
 */
var minMovesToSeat = function (seats, students) {
  let sum = 0;
  seats.sort((a, b) => a - b);
  students.sort((a, b) => a - b);
  for (let i = 0; i < students.length; i++) {
    sum += Math.abs(seats[i] - students[i]);
  }
  return sum;
};
const test = [
  [[[3, 1, 5], [2, 7, 4]], 4],
  [[[4, 1, 5, 9], [1, 3, 2, 6]], 7],
  [[[2, 2, 6, 6], [1, 3, 2, 6]], 4]
].forEach(([items, expect]) => {
  const result = minMovesToSeat(...items);
  console.log(`结果：${result} ${result.toString() === expect.toString() ? '✅' : '❌'}`);
})
// @lc code=end

