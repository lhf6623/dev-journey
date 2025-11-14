/*
 * @lc app=leetcode.cn id=747 lang=javascript
 *
 * [747] 至少是其他数字两倍的最大数
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var dominantIndex = function (nums) {
  // 最大数
  let max1 = -1;
  // 次大数
  let max2 = -2;
  let index = -1;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] > max1) {
      max2 = max1;
      max1 = nums[i];
      index = i;
    } else if (nums[i] > max2) {
      max2 = nums[i];
    }
  }
  return max1 >= max2 * 2 ? index : -1;

  // const max = Math.max(...nums);
  // const index = nums.indexOf(max);
  // const [n1, n2] = nums.sort((a, b) => b - a);
  // return n1 >= n2 * 2 ? index : -1;

  // const max = Math.max(...nums);
  // const index = nums.indexOf(max);
  // for (let i = 0; i < nums.length; i++) {
  //   if (i !== index && nums[i] * 2 > max) return -1;
  // }
  // return index;
};
const test = [
  [[[3, 6, 1, 0]], 1],
  [[[1, 2, 3, 4]], -1],
].forEach(([items, expect]) => {
  const result = dominantIndex(...items);
  console.log(`结果：${result} ${result.toString() === expect.toString() ? '✅' : '❌'}`);
})
// @lc code=end

