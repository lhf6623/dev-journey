/*
 * @lc app=leetcode.cn id=3005 lang=javascript
 *
 * [3005] 最大频率元素计数
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var maxFrequencyElements = function (nums) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    map.set(nums[i], map.get(nums[i]) + 1 || 1);
  }
  return [...map.values()].sort((a, b) => b - a).filter((item, _i, _arr) => _arr[0] === item).reduce((acc, item) => acc + item, 0);
};
const test = [
  [[[1, 2, 2, 3, 1, 4]], 4],
  [[[1, 2, 3, 4, 5]], 5],
].forEach(([items, expect]) => {
  const result = maxFrequencyElements(...items);
  console.log(`结果：${result} ${result.toString() === expect.toString() ? '✅' : '❌'}`);
})
// @lc code=end

