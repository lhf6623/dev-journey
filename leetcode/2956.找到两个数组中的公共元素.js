/*
 * @lc app=leetcode.cn id=2956 lang=javascript
 *
 * [2956] 找到两个数组中的公共元素
 */

// @lc code=start
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var findIntersectionValues = function (nums1, nums2) {

  return [nums1.filter(item => nums2.includes(item)).length, nums2.filter(item => nums1.includes(item)).length]
};
const test = [
  [[[2, 3, 2], [1, 2]], [2, 1]],
  [[[4, 3, 2, 3, 1], [2, 2, 5, 2, 3, 6]], [3, 4]],
  [[[3, 4, 2, 3], [1, 5]], [0, 0]],
]
test.forEach(([items, expect]) => {
  const result = findIntersectionValues(...items);
  console.log(`结果：${result} ${result.toString() === expect.toString() ? '✅' : '❌'}`);
})
// @lc code=end

