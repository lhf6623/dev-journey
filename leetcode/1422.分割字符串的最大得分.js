/*
 * @lc app=leetcode.cn id=1422 lang=javascript
 *
 * [1422] 分割字符串的最大得分
 */

// @lc code=start
/**
 * @param {string} s
 * @return {number}
 */
var maxScore = function (s) {
  let res = 0;
  let left = 0;
  let right = s.split('').filter(item => item === '1').length;
  for (let i = 0; i < s.length - 1; i++) {
    if (s[i] === '0') {
      left += 1;
    } else {
      right -= 1;
    }
    res = Math.max(res, left + right);
  }
  return res;
};
const test = [
  [['00'], 1],
  [["011101"], 5],
  [["00111"], 5],
  [["1111"], 3],
].forEach(([items, expect]) => {
  const result = maxScore(...items);
  console.log(`结果：${result} ${result.toString() === expect.toString() ? '✅' : '❌'}`);
})
// @lc code=end

