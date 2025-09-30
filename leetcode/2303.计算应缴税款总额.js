/*
 * @lc app=leetcode.cn id=2303 lang=javascript
 *
 * [2303] 计算应缴税款总额
 */

// @lc code=start
/**
 * @param {number[][]} brackets
 * @param {number} income
 * @return {number}
 */
var calculateTax = function (brackets, income) {
  let sum = 0;
  for (let i = 0; i < brackets.length; i++) {
    const [upper, percent] = brackets[i];
    if (upper > income) {
      sum += (income - (i === 0 ? 0 : brackets[i - 1][0])) * (percent);
      return sum / 100;
    }
    sum += (upper - (i === 0 ? 0 : brackets[i - 1][0])) * (percent);

  }
  return sum / 100;
};

const test = [
  [[[[3, 50], [7, 10], [12, 25]], 10], 2.65],
  [[[[1, 0], [4, 25], [5, 50]], 2], 0.25],
  [[[[2, 50]], 0], 0]
]

test.forEach(([[brackets, income], expect]) => {

  const result = calculateTax(brackets, income)
  console.log(`测试用例：${JSON.stringify(brackets)}, ${income}: 预期: ${expect} 结果: ${result} ${result === expect ? "通过" : "未通过"}`);

})
// @lc code=end

