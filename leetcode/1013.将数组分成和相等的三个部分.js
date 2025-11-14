/*
 * @lc app=leetcode.cn id=1013 lang=javascript
 *
 * [1013] 将数组分成和相等的三个部分
 */

// @lc code=start
/**
 * @param {number[]} arr
 * @return {boolean}
 */
var canThreePartsEqualSum = function (arr) {
  let sum = arr.reduce((a, b) => a + b, 0);
  if (sum % 3) return false;

  let curr_sum = 0;
  let count = 3;
  for (let i = 0; i < arr.length; i++) {
    curr_sum += arr[i];
    if (curr_sum === sum / 3) {
      count--;
      curr_sum = 0;
    }
    if (count <= 1 && i + 1 < arr.length) {
      return true;
    }
  }
  return false
};
const test = [
  [[[0, 2, 1, -6, 6, -7, 9, 1, 2, 0, 1]], true],
  [[[0, 2, 1, -6, 6, 7, 9, -1, 2, 0, 1]], false],
  [[[3, 3, 6, 5, -2, 2, 5, 1, -9, 4]], true]
].forEach(([items, expect]) => {
  const result = canThreePartsEqualSum(...items);
  console.log(`结果：${result} ${result.toString() === expect.toString() ? '✅' : '❌'}`);
})
// @lc code=end

