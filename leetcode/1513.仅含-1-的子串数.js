/*
 * @lc app=leetcode.cn id=1513 lang=javascript
 *
 * [1513] 仅含 1 的子串数
 */

// @lc code=start
/**
 * @param {string} s
 * @return {number}
 */
var numSub = function (s) {
  let res = 0;
  let count = 0;
  for (const c of s) {
    if (c === "1") {
      count++;
    } else {
      res += count * (count + 1) / 2;
      count = 0;
    }
  }
  res += count * (count + 1) / 2;
  return res % (10 ** 9 + 7);
};
const test = [
  [["0110111"], 9],
  [["101"], 2],
  [["111111"], 21],
  [["000"], 0],
].forEach(([items, expect]) => {
  const result = numSub(...items);
  console.log(`结果：${result} ${result.toString() === expect.toString() ? '✅' : '❌'}`);
})
// @lc code=end

