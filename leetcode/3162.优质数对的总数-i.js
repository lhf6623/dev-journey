/*
 * @lc app=leetcode.cn id=3162 lang=javascript
 *
 * [3162] 优质数对的总数 I
 */

// @lc code=start
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @param {number} k
 * @return {number}
 */
var numberOfPairs = function (nums1, nums2, k) {
  let count = 0;
  for (let i = 0; i < nums1.length; i++) {
    for (let j = 0; j < nums2.length; j++) {
      const num = nums1[i] / (nums2[j] * k)
      if (num === (num | 0)) {
        count++;
      }
    }
  }
  return count;
};
const test = [
  [[[1, 3, 4], [1, 3, 4], 1], 5],
  [[[1, 2, 4, 12], [2, 4], 3], 2],
].forEach(([items, expect]) => {
  const result = numberOfPairs(...items);
  console.log(`结果：${result} ${result.toString() === expect.toString() ? '✅' : '❌'}`);
})
// @lc code=end

