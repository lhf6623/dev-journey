/*
 * @lc app=leetcode.cn id=540 lang=javascript
 *
 * [540] 有序数组中的单一元素
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var singleNonDuplicate = function (nums) {
  // for (let i = 0; i < nums.length - 1; i += 2) {
  //   if (nums[i] !== nums[i + 1]) {
  //     return nums[i];
  //   }
  // }
  // return nums.at(-1);

  while (nums.length >= 1) {
    let [n1, n2, ..._nums] = nums;
    if (n1 !== n2) {
      return n1;
    }

    nums = _nums;
  }
};

const nums = [1, 1, 2, 3, 3, 4, 4, 8, 8];
console.log(singleNonDuplicate(nums));

// @lc code=end
