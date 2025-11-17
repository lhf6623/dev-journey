/*
 * @lc app=leetcode.cn id=84 lang=javascript
 *
 * [84] 柱状图中最大的矩形
 */

// @lc code=start
/**
 * @param {number[]} heights
 * @return {number}
 */
var largestRectangleArea = function (heights) {
  heights.push(-1);
  const stack = [-1];
  let max = 0;
  for (let i = 0; i < heights.length; i++) {
    while (stack[stack.length - 1] !== -1 && heights[stack[stack.length - 1]] > heights[i]) {
      const height = heights[stack.pop()];
      const width = i - stack[stack.length - 1] - 1;
      max = Math.max(max, height * width);
    }
    stack.push(i);
  }
  return max;
};
const test = [
  [[[2, 1, 5, 6, 2, 3]], 10],
  [[[2, 4]], 4],
].forEach(([items, expect]) => {
  const result = largestRectangleArea(...items);
  console.log(`结果：${result} ${result.toString() === expect.toString() ? '✅' : '❌'}`);
})
// @lc code=end

