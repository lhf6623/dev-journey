/*
 * @lc app=leetcode.cn id=3349 lang=javascript
 *
 * [3349] 检测相邻递增子数组 I
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {boolean}
 */
var hasIncreasingSubarrays = function (nums, k) {
  let res1 = [];
  let res2 = [];
  let is_interrupt = false;
  for (let i = 0; i < nums.length; i++) {
    let temp = is_interrupt ? res2 : res1;

    if ((temp.at(-1) ?? -1001) < nums[i]) {
      temp.push(nums[i]);
    } else {
      if (is_interrupt) {
        if (Math.max(res1.length, res2.length) / 2 >= k || (res1.length >= k && res2.length >= k)) return true;
        res1 = [...res2]
      }
      res2 = [nums[i]]
      is_interrupt = true;
    }
  }

  return Math.max(res1.length, res2.length) / 2 >= k || (res1.length >= k && res2.length >= k);
};
const test = [
  [[[8, -4, -1, 16, 20], 2], true],
  [[[19, 4, 19, 6, 18], 2], true],
  [[[-2, 14, 0, -4], 2], false],
  [[[-3, -8, 20, -11], 2], false],
  [[[-15, 19], 1], true],
  [[[5, 8, -2, -1], 2], true],
  [[[2, 5, 7, 8, 9, 2, 3, 4, 3, 1], 3], true],
  [[[1, 2, 3, 4, 4, 4, 4, 5, 6, 7], 5], false],
]
test.forEach(([items, expect]) => {
  const result = hasIncreasingSubarrays(...items);
  console.log(`结果：${result} ${result.toString() === expect.toString() ? '✅' : '❌'}`);
})
// @lc code=end

