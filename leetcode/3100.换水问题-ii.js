/*
 * @lc app=leetcode.cn id=3100 lang=javascript
 *
 * [3100] 换水问题 II
 */

// @lc code=start
/**
 * @param {number} numBottles
 * @param {number} numExchange
 * @return {number}
 */
var maxBottlesDrunk = function (numBottles, numExchange) {
  let res = numBottles;
  let temp = numBottles;
  while (temp >= numExchange) {
    res++;
    temp -= numExchange - 1;
    numExchange++;
  }
  return res;

  // 数学方法
  // const x = (1 - 2 * numExchange + Math.sqrt(4 * numExchange * numExchange - 12 * numExchange + 1 + 8 * numBottles)) / 2;
  // return numBottles + Math.floor(x) + 1;
};

const test = [
  [[13, 6], 15],
  [[10, 3], 13]
]

test.forEach(([args, expect]) => {
  const res = maxBottlesDrunk(...args)
  console.log(`测试用例: ${args}: 预期: ${expect} 结果: ${res} ${res === expect ? "通过" : "未通过"}`)
})
// @lc code=end

