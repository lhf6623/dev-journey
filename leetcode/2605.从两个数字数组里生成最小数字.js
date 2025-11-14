/*
 * @lc app=leetcode.cn id=2605 lang=javascript
 *
 * [2605] 从两个数字数组里生成最小数字
 */

// @lc code=start
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var minNumber = function (nums1, nums2) {
  const arr = [...new Set([...nums1, ...nums2])];
  if (arr.length === (nums1.length + nums2.length)) {
    const n1 = Math.min(...nums1);
    const n2 = Math.min(...nums2);
    if (n1 < n2) {
      return n1 * 10 + n2;
    } else if (n1 > n2) {
      return n2 * 10 + n1;
    }
    return n1;
  }
  let min = Infinity;
  for (let i = 0; i < nums1.length; i++) {
    if (nums2.includes(nums1[i])) {
      min = Math.min(min, nums1[i]);
    }
  }
  return min;
};
const test = [
  [[[4, 1, 3], [5, 7]], 15],
  [[[3, 5, 2, 6], [3, 1, 7]], 3],
].forEach(([items, expect]) => {
  const result = minNumber(...items);
  console.log(`结果：${result} ${result.toString() === expect.toString() ? '✅' : '❌'}`);
})
// @lc code=end

