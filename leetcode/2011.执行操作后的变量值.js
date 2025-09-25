/*
 * @lc app=leetcode.cn id=2011 lang=javascript
 *
 * [2011] 执行操作后的变量值
 */

// @lc code=start
/**
 * @param {string[]} operations
 * @return {number}
 */
var finalValueAfterOperations = function (operations) {
  let x = 0;
  for (let i = 0; i < operations.length; i++) {
    if (operations[i] === "X++" || operations[i] === "++X") {
      x++;
    } else {
      x--;
    }
  }
  return x;
};

const test = [
  [["--X", "X++", "X++"], 1],
  [["++X", "++X", "X++"], 3],
];

test.forEach(([operations, expect]) => {
  const result = finalValueAfterOperations(operations);
  console.log(
    `测试用例: ${operations}: ${expect === result ? "通过" : "未通过"}`
  );
});
// @lc code=end
