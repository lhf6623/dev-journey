/*
 * @lc app=leetcode.cn id=1313 lang=javascript
 *
 * [1313] 解压缩编码列表
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var decompressRLElist = function (nums) {
  const res = [];
  for (let i = 0; i < nums.length; i += 2) {
    res.push(...Array(nums[i]).fill(nums[i + 1]))
  }
  return res
};

const test = [
  [[1, 2, 3, 4], [2, 4, 4, 4]],
  [[1, 1, 2, 3], [1, 3, 3]]
]

test.forEach(([nums, res]) => {
  const result = decompressRLElist(nums);
  console.log(result.toString() === res.toString())
})
// @lc code=end

