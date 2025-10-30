/*
 * @lc app=leetcode.cn id=2917 lang=javascript
 *
 * [2917] 找出数组中的 K-or 值
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var findKOr = function (nums, k) {
  let ans = 0;
  for (let i = 0; i < 32; i++) {
    let cnt = 0;
    for (const num of nums) {
      if ((num >> i) & 1) {
        cnt++;
      }
    }
    if (cnt >= k) {
      ans |= 1 << i;
    }
  }
  return ans;
};
const test = [
  [[[7, 12, 9, 8, 9, 15], 4], 9],
  [[[2, 12, 1, 11, 4, 5], 6], 0],
  [[[10, 8, 5, 9, 11, 6, 8], 1], 15]
].forEach(([items, expect]) => {
  const result = findKOr(...items);
  console.log(`结果：${result} ${result.toString() === expect.toString() ? '✅' : '❌'}`);
})
// @lc code=end

