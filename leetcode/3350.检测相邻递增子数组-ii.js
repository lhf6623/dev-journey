/*
 * @lc app=leetcode.cn id=3350 lang=javascript
 *
 * [3350] 检测相邻递增子数组 II
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var maxIncreasingSubarrays = function (nums) {
  let temp = [];
  let k_arr = [];
  for (let i = 0; i < nums.length; i++) {

    if ((temp.at(-1) ?? -Infinity) < nums[i]) {
      temp.push(nums[i]);
    } else {
      k_arr.push(temp.length);
      temp = [nums[i]];
    }
  }
  k_arr.push(temp.length);

  const max = Math.max(...k_arr);
  let _max = -Infinity;
  let left = 0;
  while (left < k_arr.length - 1) {
    _max = Math.max(_max, Math.min(k_arr[left], k_arr[left + 1]));
    left += 1;
  }

  if (((max / 2) | 0) > _max) return (max / 2) | 0;

  return _max
};
const test = [
  [[[7, -14, -16, 17, 9, 14]], 2],
  [[[-8, 0, 5, 18, -9]], 2],
  [[[-15, 19]], 1],
  [[[2, 5, 7, 8, 9, 2, 3, 4, 3, 1]], 3],
  [[[1, 2, 3, 4, 4, 4, 4, 5, 6, 7]], 2],
]
test.forEach(([items, expect]) => {
  const result = maxIncreasingSubarrays(...items);
  console.log(`结果：${result} ${result.toString() === expect.toString() ? '✅' : '❌'}`);
})
// @lc code=end

