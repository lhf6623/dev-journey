/*
 * @lc app=leetcode.cn id=2974 lang=javascript
 *
 * [2974] 最小数字游戏
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var numberGame = function (nums) {
  nums.sort((a, b) => a - b);
  for (let i = 0; i < nums.length; i += 2) {
    const temp = nums[i];
    nums[i] = nums[i + 1];
    nums[i + 1] = temp;
  }
  return nums;
};
const test = [
  [[[5, 4, 2, 3]], [3, 2, 5, 4]],
  [[[2, 5]], [5, 2]],
]
test.forEach(([items, expect]) => {
  const result = numberGame(...items);
  console.log(`结果：${result} ${result.toString() === expect.toString() ? '✅' : '❌'}`);
})
// @lc code=end

