/*
 * @lc app=leetcode.cn id=3285 lang=javascript
 *
 * [3285] 找到稳定山的下标
 */

// @lc code=start
/**
 * @param {number[]} height
 * @param {number} threshold
 * @return {number[]}
 */
var stableMountains = function (height, threshold) {
  const res = []
  for (let i = 1; i < height.length; i++) {
    if (height[i - 1] > threshold) {
      res.push(i)
    }
  }
  return res
};


const test = [
  [[[1, 2, 3, 4, 5], 2], [3, 4]],
  [[[10, 1, 10, 1, 10], 3], [1, 3]],
]
test.forEach(([args, expect]) => {
  const res = stableMountains(...args)
  const resStr = res.sort((a, b) => a - b).toString();
  const argsStr = args.sort((a, b) => a - b).toString();
  const expectStr = expect.sort((a, b) => a - b).toString();
  console.log(`测试用例: ${argsStr}: 预期: ${expectStr} 结果: ${resStr} ${resStr === expectStr ? "通过" : "未通过"}`)
})
// @lc code=end

