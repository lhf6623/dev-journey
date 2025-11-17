/*
 * @lc app=leetcode.cn id=1624 lang=javascript
 *
 * [1624] 两个相同字符之间的最长子字符串
 */

// @lc code=start
/**
 * @param {string} s
 * @return {number}
 */
var maxLengthBetweenEqualCharacters = function (s) {
  let ans = -1;
  for (let i = 0; i < s.length; i++) {
    for (let j = s.length - 1; j > i; j--) {
      if (s[i] === s[j]) {
        ans = Math.max(ans, j - i - 1);
      }
    }
  }
  return ans;
};
const test = [
  [["aa"], 0],
  [["abca"], 2],
  [["cbzxy"], -1],
  [["cabbac"], 4],
].forEach(([items, expect]) => {
  const result = maxLengthBetweenEqualCharacters(...items);
  console.log(`结果：${result} ${result.toString() === expect.toString() ? '✅' : '❌'}`);
})
// @lc code=end

