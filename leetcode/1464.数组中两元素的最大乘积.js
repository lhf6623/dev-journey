/*
 * @lc app=leetcode.cn id=1464 lang=javascript
 *
 * [1464] 数组中两元素的最大乘积
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var maxProduct = function (nums) {
  let n1 = nums[0];
  let n2 = nums[nums.length - 1];
  let left = 1;
  let right = nums.length - 2;
  if (n1 < n2) [n1, n2] = [n2, n1];
  while (left < right) {
    if (nums[left] > n1) {
      n2 = n1;
      n1 = nums[left];
    } else if (nums[left] > n2) {
      n2 = nums[left];
    }
    if (nums[right] > n1) {
      n2 = n1;
      n1 = nums[right];
    } else if (nums[right] > n2) {
      n2 = nums[right];
    }
    left++;
    right--;
  }
  return (n1 - 1) * (n2 - 1);
  // const [n1, n2] = nums.sort((a, b) => b - a);
  // return (n1 - 1) * (n2 - 1);
};

console.log(maxProduct([10, 2, 5, 2]));

// @lc code=end
