/*
 * @lc app=leetcode.cn id=2598 lang=javascript
 *
 * [2598] 执行操作后的最大 MEX
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} value
 * @return {number}
 */
var findSmallestInteger = function (nums, value) {
  const cnt = Array(value).fill(0);
  for (const x of nums) {
    cnt[(x % value + value) % value]++;
  }

  let i = 0;
  for (let j = 1; j < value; j++) {
    if (cnt[j] < cnt[i]) {
      i = j;
    }
  }
  return value * cnt[i] + i;
};
const test = [
  [[[1, -10, 7, 13, 6, 8], 5], 4],
  [[[1, -10, 7, 13, 6, 8], 7], 2],
]
test.forEach(([items, expect]) => {
  const result = findSmallestInteger(...items);
  console.log(`结果：${result} ${result.toString() === expect.toString() ? '✅' : '❌'}`);
})
// @lc code=end

