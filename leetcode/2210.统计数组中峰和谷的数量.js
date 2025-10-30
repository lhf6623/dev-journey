/*
 * @lc app=leetcode.cn id=2210 lang=javascript
 *
 * [2210] 统计数组中峰和谷的数量
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var countHillValley = function (nums) {
  let ans = 0;
  let left = 0;
  let trend = 0;
  while (left < nums.length - 1) {
    if (nums[left] > nums[left + 1]) {
      if (trend == -1) ans++;
      trend = 1
    } else if (nums[left] < nums[left + 1]) {
      if (trend == 1) ans++;
      trend = -1
    }
    left++;
  }
  return ans;
};
const test = [
  [[[2, 4, 1, 1, 6, 5]], 3],
  [[[6, 6, 5, 5, 4, 1]], 0],
].forEach(([items, expect]) => {
  const result = countHillValley(...items);
  console.log(`结果：${result} ${result.toString() === expect.toString() ? '✅' : '❌'}`);
})
// @lc code=end

