/*
 * @lc app=leetcode.cn id=3397 lang=javascript
 *
 * [3397] 执行操作后不同元素的最大数量
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var maxDistinctElements = function (nums, k) {
  nums.sort((a, b) => a - b);
  let cnt = 0;
  let prev = -Number.MAX_SAFE_INTEGER;

  for (const num of nums) {
    const curr = Math.min(Math.max(num - k, prev + 1), num + k);
    if (curr > prev) {
      cnt++;
      prev = curr;
    }
  }
  return cnt;
};
const test = [
  [[[1, 2, 2, 3, 3, 4], 2], 6],
  [[[4, 4, 4, 4], 1], 3],
]
test.forEach(([items, expect]) => {
  const result = maxDistinctElements(...items);
  console.log(`结果：${result} ${result.toString() === expect.toString() ? '✅' : '❌'}`);
})
// @lc code=end

