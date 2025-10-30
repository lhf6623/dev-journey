/*
 * @lc app=leetcode.cn id=3427 lang=javascript
 *
 * [3427] 变长子数组求和
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var subarraySum = function (nums) {
  return nums.reduce((acc, cur, index) => {
    let max = 0
    let start = Math.max(0, index - cur);
    while (start <= index) {
      max += nums[start];
      start++;
    }
    return acc + max;
  }, 0);
};
const test = [
  [[[2, 3, 1]], 11],
  [[[3, 1, 1, 2]], 13],
]
test.forEach(([items, expect]) => {
  const result = subarraySum(...items);
  console.log(`结果：${result} ${result.toString() === expect.toString() ? '✅' : '❌'}`);
})
// @lc code=end

