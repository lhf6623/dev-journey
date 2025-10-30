/*
 * @lc app=leetcode.cn id=1526 lang=javascript
 *
 * [1526] 形成目标数组的子数组最少增加次数
 */

// @lc code=start
/**
 * @param {number[]} target
 * @return {number}
 */
var minNumberOperations = function (target) {
  let result = 0
  let pre = 0
  for (let i = 0; i < target.length; i++) {
    if (target[i] > pre) {
      result += target[i] - pre
    }
    pre = target[i]
  }

  return result
};
const test = [
  [[[1, 2, 3, 2, 1]], 3],
  [[[3, 1, 1, 2]], 4],
  [[[3, 1, 5, 4, 2]], 7],
  [[[1, 1, 1, 1]], 1],
].forEach(([items, expect]) => {
  const result = minNumberOperations(...items);
  console.log(`结果：${result} ${result.toString() === expect.toString() ? '✅' : '❌'}`);
})
// @lc code=end

