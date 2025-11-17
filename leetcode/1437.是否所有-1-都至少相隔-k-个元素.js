/*
 * @lc app=leetcode.cn id=1437 lang=javascript
 *
 * [1437] 是否所有 1 都至少相隔 k 个元素
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {boolean}
 */
var kLengthApart = function (nums, k) {
  let last = -1;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] === 1) {
      if (last !== -1 && i - last - 1 < k) {
        return false;
      }
      last = i;
    }
  }
  return true;
};
const test = [
  [[[1, 0, 0, 0, 1, 0, 0, 1], 2], true],
  [[[1, 0, 0, 1, 0, 1], 2], false],
].forEach(([items, expect]) => {
  const result = kLengthApart(...items);
  console.log(`结果：${result} ${result.toString() === expect.toString() ? '✅' : '❌'}`);
})
// @lc code=end

