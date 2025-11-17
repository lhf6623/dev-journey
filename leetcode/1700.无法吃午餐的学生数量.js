/*
 * @lc app=leetcode.cn id=1700 lang=javascript
 *
 * [1700] 无法吃午餐的学生数量
 */

// @lc code=start
/**
 * @param {number[]} students
 * @param {number[]} sandwiches
 * @return {number}
 */
var countStudents = function (students, sandwiches) {
  let count = 0;
  while (students.length && count < students.length) {
    if (students[0] === sandwiches[0]) {
      students.shift();
      sandwiches.shift();
      count = 0;
    } else {
      students.push(students.shift());
      count++;
    }
  }
  return students.length;
};
const test = [
  [[[1, 1, 0, 0], [0, 1, 0, 1]], 0],
  [[[1, 1, 1, 0, 0, 1], [1, 0, 0, 0, 1, 1]], 3],
].forEach(([items, expect]) => {
  const result = countStudents(...items);
  console.log(`结果：${result} ${result.toString() === expect.toString() ? '✅' : '❌'}`);
})
// @lc code=end

