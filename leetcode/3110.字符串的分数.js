/*
 * @lc app=leetcode.cn id=3110 lang=javascript
 *
 * [3110] 字符串的分数
 */

// @lc code=start
/**
 * @param {string} s
 * @return {number}
 */
var scoreOfString = function (s) {
  let ans = 0;
  for (let i = 0; i < s.length - 1; i++) {
    ans += Math.abs(s[i].charCodeAt(0) - s[i + 1].charCodeAt(0))
  }
  return ans;
};

const test = [
  [["hello"], 13],
  [["zaz"], 50],
].forEach(([items, expect]) => {
  const result = scoreOfString(...items);
  console.log(`结果：${result} ${result.toString() === expect.toString() ? '✅' : '❌'}`);
})
// @lc code=end

