/*
 * @lc app=leetcode.cn id=2169 lang=javascript
 *
 * [2169] 得到 0 的操作数
 */

// @lc code=start
/**
 * @param {number} num1
 * @param {number} num2
 * @return {number}
 */
var countOperations = function (num1, num2) {
  let count = 0;
  while (num1 !== 0 && num2 !== 0) {
    count += 1;
    const min = Math.min(num1, num2);
    num1 = Math.abs(num2 - num1);
    num2 = min;
  }
  return count;
  // let count = 0;
  // while (num1 !== 0 && num2 !== 0) {
  //   if (num1 >= num2) {
  //     num1 -= num2;
  //   } else {
  //     num2 -= num1;
  //   }
  //   count++;
  // }
  // return count;
};
const test = [
  [[2, 3], 3],
  [[10, 10], 1],
].forEach(([items, expect]) => {
  const result = countOperations(...items);
  console.log(`结果：${result} ${result.toString() === expect.toString() ? '✅' : '❌'}`);
})
// @lc code=end

