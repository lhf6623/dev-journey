/*
 * @lc app=leetcode.cn id=1588 lang=javascript
 *
 * [1588] 所有奇数长度子数组的和
 */

// @lc code=start
/**
 * @param {number[]} arr
 * @return {number}
 */
var sumOddLengthSubarrays = function (arr) {
  let res = 0;
  let i = 1
  const len = arr.length;
  while (i <= len) {
    if (i % 2 !== 1) {
      i += 1
      continue;
    }
    for (let j = 0; j < len; j++) {
      if (j + i > len) continue;
      for (let k = j; k < j + i; k++) {
        res += arr[k];
      }
    }
    i += 1
  }
  return res;
};
const test = [
  [[[1, 4, 2, 5, 3]], 58],
  [[[1, 2]], 3],
  [[[10, 11, 12]], 66],
].forEach(([items, expect]) => {
  const result = sumOddLengthSubarrays(...items);
  console.log(`结果：${result} ${result.toString() === expect.toString() ? '✅' : '❌'}`);
})
// @lc code=end

