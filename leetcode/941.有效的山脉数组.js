/*
 * @lc app=leetcode.cn id=941 lang=javascript
 *
 * [941] 有效的山脉数组
 */

// @lc code=start
/**
 * @param {number[]} arr
 * @return {boolean}
 */
var validMountainArray = function (arr) {
  // 先上山，再下山
  let i = 0;
  while (i < arr.length - 1 && arr[i] < arr[i + 1]) {
    i++;
  }
  if (i === 0 || i === arr.length - 1) {
    return false;
  }
  while (i < arr.length - 1 && arr[i] > arr[i + 1]) {
    i++;
  }
  return i === arr.length - 1;
};

console.log(validMountainArray([0, 3, 2, 1]));

// @lc code=end
