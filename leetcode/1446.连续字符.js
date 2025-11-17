/*
 * @lc app=leetcode.cn id=1446 lang=javascript
 *
 * [1446] 连续字符
 */

// @lc code=start
/**
 * @param {string} s
 * @return {number}
 */
var maxPower = function (s) {
  let res = 1;
  let count = 1;
  for (let i = 1; i < s.length; i++) {
    if (s[i] === s[i - 1]) {
      count++;
    } else {
      res = Math.max(res, count);
      count = 1;
    }
  }
  res = Math.max(res, count);
  return res;
};
const test = [
  [["leetcode"], 2],
  [["abbcccddddeeeeedcba"], 5],
].forEach(([items, expect]) => {
  const result = maxPower(...items);
  console.log(`结果：${result} ${result.toString() === expect.toString() ? '✅' : '❌'}`);
})
// @lc code=end

