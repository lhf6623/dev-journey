/*
 * @lc app=leetcode.cn id=739 lang=javascript
 *
 * [739] 每日温度
 */

// @lc code=start
/**
 * @param {number[]} temperatures
 * @return {number[]}
 */
var dailyTemperatures = function (temperatures) {
  const n = temperatures.length;
  const ans = new Array(n).fill(0);
  const stack = [];
  for (let i = 0; i < n; ++i) {
    while (stack.length && temperatures[i] > temperatures[stack[stack.length - 1]]) {
      const prev = stack.pop();
      ans[prev] = i - prev;
    }
    stack.push(i);
  }
  return ans;
};
const test = [
  [[[73, 74, 75, 71, 69, 72, 76, 73]], [1, 1, 4, 2, 1, 1, 0, 0]],
  [[[30, 40, 50, 60]], [1, 1, 1, 0]],
  [[[30, 60, 90]], [1, 1, 0]],
].forEach(([items, expect]) => {
  const result = dailyTemperatures(...items);
  console.log(`结果：${result} ${result.toString() === expect.toString() ? '✅' : '❌'}`);
})
// @lc code=end

