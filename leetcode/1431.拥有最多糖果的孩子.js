/*
 * @lc app=leetcode.cn id=1431 lang=javascript
 *
 * [1431] 拥有最多糖果的孩子
 */

// @lc code=start
/**
 * @param {number[]} candies
 * @param {number} extraCandies
 * @return {boolean[]}
 */
var kidsWithCandies = function (candies, extraCandies) {
  const max = Math.max(...candies);
  return candies.map(item => item + extraCandies >= max)
};

const test = [
  [[[2, 3, 5, 1, 3], 3], [true, true, true, false, true]],
  [[[4, 2, 1, 1, 2], 1], [true, false, false, false, false]],
  [[[12, 1, 12], 10], [true, false, true]]
]

test.forEach(([item, res]) => {
  const result = kidsWithCandies(...item);
  console.log(result.toString() === res.toString() ? "测试成功" : "测试失败")
})
// @lc code=end

