/*
 * @lc app=leetcode.cn id=1491 lang=javascript
 *
 * [1491] 去掉最低工资和最高工资后的工资平均值
 */

// @lc code=start
/**
 * @param {number[]} salary
 * @return {number}
 */
var average = function (salary) {
  salary.sort((a, b) => a - b);
  // 找出第一个数
  salary.shift();

  // 删除最后一个数
  salary.length -= 1;
  return salary.reduce((a, b) => a + b, 0) / salary.length;

  // return (
  //   (salary.reduce((a, b) => a + b, 0) -
  //     Math.min(...salary) -
  //     Math.max(...salary)) /
  //   (salary.length - 2)
  // );
};

console.log(average([4000, 3000, 1000, 2000]));

// @lc code=end
