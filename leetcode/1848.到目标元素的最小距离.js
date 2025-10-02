/*
 * @lc app=leetcode.cn id=1848 lang=javascript
 *
 * [1848] 到目标元素的最小距离
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} target
 * @param {number} start
 * @return {number}
 */
var getMinDistance = function (nums, target, start) {
  let res = 10 ** 4;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] === target && Math.abs(i - start) < res) {
      res = Math.abs(i - start)
    }
  }
  return res;
};

const test = [
  [[[1, 2, 3, 4, 5], 5, 3], 1],
  [[[1], 1, 0], 0],
  [[[1, 1, 1, 1, 1, 1, 1, 1, 1, 1], 1, 0], 0]
]
test.forEach(([args, expect]) => {
  const res = getMinDistance(...args)
  console.log(`测试用例: ${JSON.stringify(args)}: 预期: ${expect} 结果: ${res} ${res === expect ? "通过" : "未通过"}`)
})
// @lc code=end

