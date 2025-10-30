/*
 * @lc app=leetcode.cn id=3354 lang=javascript
 *
 * [3354] 使数组元素等于零
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var countValidSelections = function (nums) {
  let sum = 0;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] === 0) {
      let test = 0;
      for (let j = 0; j < nums.length; j++) {
        if (j < i) {
          test += nums[j];
        } else {
          test -= nums[j];
        }
      }
      if (test === 0) {
        sum += 2;
        continue;
      }
      if (test === 1 || test === -1) {
        sum += 1;
      }
    }
  }
  return sum;
};
const test = [
  [[[16, 0, 0, 12, 5]], 2],
  [[[16, 13, 10, 0, 0, 0, 10, 6, 7, 8, 7]], 3],
  [[[1, 0, 2, 0, 3]], 2],
  [[[2, 3, 4, 0, 4, 1, 0]], 0],
].forEach(([items, expect]) => {
  const result = countValidSelections(...items);
  console.log(`结果：${result} ${result.toString() === expect.toString() ? '✅' : '❌'}`);
})
// @lc code=end

