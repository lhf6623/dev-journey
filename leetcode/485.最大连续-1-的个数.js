/*
 * @lc app=leetcode.cn id=485 lang=javascript
 *
 * [485] 最大连续 1 的个数
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var findMaxConsecutiveOnes = function (nums) {
  let max = 0;
  let temp = 0;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] === 1) {
      temp++;
    } else {
      max = Math.max(max, temp);
      temp = 0;
    }
  }
  max = Math.max(max, temp);
  return max;

  // return nums
  //   .join("")
  //   .replace(/0+/g, ",")
  //   .split(",")
  //   .sort((a, b) => b.length - a.length)[0].length;
};

console.log(findMaxConsecutiveOnes([1, 1, 0, 1, 1, 1]));

// @lc code=end
