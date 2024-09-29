/*
 * @lc app=leetcode.cn id=414 lang=javascript
 *
 * [414] 第三大的数
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var thirdMax = function (nums) {
  /* 
    执行用时：60 ms, 在所有 JavaScript 提交中击败了84.71%的用户
    内存消耗：43.4 MB, 在所有 JavaScript 提交中击败了26.66%的用户
  */

  /* nums = [...new Set(nums)];
  return nums.sort((a, b) => b - a)[nums.length <= 2 ? 0 : 2]; */

  /* 
    执行用时：72 ms, 在所有 JavaScript 提交中击败了25.83%的用户
    内存消耗：41.3 MB, 在所有 JavaScript 提交中击败了86.88%的用户
  */
  let m1 = null,
    m2 = null,
    m3 = null;
  for (let i = 0; i < nums.length; i++) {
    const item = nums[i];
    if (m1 === null) {
      m1 = item;
      continue;
    }
    if (m2 === null) {
      if (item > m1) {
        m2 = m1;
        m1 = item;
        continue;
      }
      if (item < m1) {
        m2 = item;
      }
      continue;
    }
    if (m3 === null) {
      if (item > m1) {
        m3 = m2;
        m2 = m1;
        m1 = item;
        continue;
      }
      if (item > m2 && item < m1) {
        m3 = m2;
        m2 = item;
        continue;
      }
      if (item < m2) {
        m3 = item;
      }
      continue;
    }

    if (item > m1) {
      m3 = m2;
      m2 = m1;
      m1 = item;
      continue;
    }
    if (item > m2 && item < m1) {
      m3 = m2;
      m2 = item;
      continue;
    }
    if (item > m3 && item < m2) {
      m3 = item;
      continue;
    }
  }
  return m3 === null ? m1 : m3;
};

// console.log(thirdMax([1, 2, -2147483648]));
// @lc code=end
