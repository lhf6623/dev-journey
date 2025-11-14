/*
 * @lc app=leetcode.cn id=1287 lang=javascript
 *
 * [1287] 有序数组中出现次数超过25%的元素
 */

// @lc code=start
/**
 * @param {number[]} arr
 * @return {number}
 */
var findSpecialInteger = function (arr) {
  let count = 0;
  const len = arr.length;
  const threshold = Math.floor(len / 4);
  for (let i = 0; i < len; i++) {
    if (arr[i] === arr[i + 1]) {
      count++;
    } else {
      if (arr[i] === arr[i - 1]) {
        count++;
      }
      if (count > threshold) {
        return arr[i];
      }
      count = 0;
    }
  }
  return arr[0];
};
const test = [
  [[[15, 15, 21, 21, 32, 32, 33, 33, 33, 34, 35]], 33],
  [[[1, 2, 3, 3]], 3],
  [[[1]], 1],
  [[[1, 2, 2, 6, 6, 6, 6, 7, 10]], 6],
].forEach(([items, expect]) => {
  const result = findSpecialInteger(...items);
  console.log(`结果：${result} ${result.toString() === expect.toString() ? '✅' : '❌'}`);
})
// @lc code=end

