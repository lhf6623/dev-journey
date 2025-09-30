/*
 * @lc app=leetcode.cn id=1518 lang=javascript
 *
 * [1518] 换水问题
 */

// @lc code=start
/**
 * @param {number} numBottles
 * @param {number} numExchange
 * @return {number}
 */
var numWaterBottles = function (numBottles, numExchange) {
  let res = numBottles;
  while (numBottles >= numExchange) {
    const temp = (numBottles / numExchange) | 0;
    numBottles = numBottles % numExchange + temp;
    res += temp;
  }
  return res;
};

const test = [
  [[8, 3], 11],
  [[15, 4], 19],
]

test.forEach(([[numBottles, numExchange], expect]) => {
  const result = numWaterBottles(numBottles, numExchange);
  console.log(`测试用例：${[numBottles, numExchange]}: 结果${result} ${expect === result ? "通过" : "未通过"}`)
})
// @lc code=end

