/*
 * @lc app=leetcode.cn id=636 lang=javascript
 *
 * [636] 函数的独占时间
 */

// @lc code=start
/**
 * @param {number} n
 * @param {string[]} logs
 * @return {number[]}
 */
var exclusiveTime = function (n, logs) {
  let res = new Array(n).fill(0);
  let stack = [];
  let prev = 0;
  for (const log of logs) {
    const [id, status, time] = log.split(":");
    if (status === "start") {
      if (stack.length) {
        res[stack[stack.length - 1]] += Number(time) - prev;
      }
      stack.push(id);
      prev = Number(time);
    } else {
      res[stack.pop()] += Number(time) - prev + 1;
      prev = Number(time) + 1;
    }
  }
  return res;
};
const test = [
  [[2, ["0:start:0", "1:start:2", "1:end:5", "0:end:6"]], [3, 4]],
  [[1, ["0:start:0", "0:start:2", "0:end:5", "0:start:6", "0:end:6", "0:end:7"]], [8]],
  [[2, ["0:start:0", "0:start:2", "0:end:5", "1:start:6", "1:end:6", "0:end:7"]], [7, 1]]
].forEach(([items, expect]) => {
  const result = exclusiveTime(...items);
  console.log(`结果：${result} ${result.toString() === expect.toString() ? '✅' : '❌'}`);
})
// @lc code=end

