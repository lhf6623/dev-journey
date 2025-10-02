/*
 * @lc app=leetcode.cn id=1365 lang=javascript
 *
 * [1365] 有多少小于当前数字的数字
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var smallerNumbersThanCurrent = function (nums) {

  const map = new Map();
  nums.toSorted((a, b) => a - b).forEach((item, index) => {
    if (!map.has(item)) {
      map.set(item, index)
    }
  })
  return nums.map(item => map.get(item))
};
const test = [
  [[8, 1, 2, 2, 3], [4, 0, 1, 1, 3]],
  [[6, 5, 4, 8], [2, 1, 0, 3]],
  [[7, 7, 7, 7], [0, 0, 0, 0]]
]

test.forEach(([nums, res]) => {
  const result = smallerNumbersThanCurrent(nums);
  console.log(result.toString() === res.toString() ? "测试成功" : "测试失败")
})
// @lc code=end

