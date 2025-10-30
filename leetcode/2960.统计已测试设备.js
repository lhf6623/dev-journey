/*
 * @lc app=leetcode.cn id=2960 lang=javascript
 *
 * [2960] 统计已测试设备
 */

// @lc code=start
/**
 * @param {number[]} batteryPercentages
 * @return {number}
 */
var countTestedDevices = function (batteryPercentages) {
  let count = 0
  for (let i = 0; i < batteryPercentages.length; i++) {
    if (batteryPercentages[i] > 0) {
      count++
      for (let j = i + 1; j < batteryPercentages.length; j++) {
        if (batteryPercentages[j] > 0) {
          batteryPercentages[j]--
        }
      }
    }
  }
  return count
};
const test = [
  [[[1, 1, 2, 1, 3]], 3],
  [[[0, 1, 2]], 2],
].forEach(([items, expect]) => {
  const result = countTestedDevices(...items);
  console.log(`结果：${result} ${result.toString() === expect.toString() ? '✅' : '❌'}`);
})
// @lc code=end

