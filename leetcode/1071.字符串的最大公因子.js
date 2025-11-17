/*
 * @lc app=leetcode.cn id=1071 lang=javascript
 *
 * [1071] 字符串的最大公因子
 */

// @lc code=start
/**
 * @param {string} str1
 * @param {string} str2
 * @return {string}
 */
var gcdOfStrings = function (str1, str2) {
  if (str1 === str2) return str1;

  if (str1.length < str2.length) {
    [str1, str2] = [str2, str1];
  }

  if (!str1.startsWith(str2)) {
    return '';
  } else {
    return gcdOfStrings(str1.slice(str2.length), str2);
  }
};
const test = [
  [["TAUXXTAUXXTAUXXTAUXXTAUXX", "TAUXXTAUXXTAUXXTAUXXTAUXXTAUXXTAUXXTAUXXTAUXX"], "TAUXX"],
  [["ABCABC", "ABC"], "ABC"],
  [["ABABAB", "ABAB"], "AB"],
  [["LEET", "CODE"], ''],
].forEach(([items, expect]) => {
  const result = gcdOfStrings(...items);
  console.log(`结果：${result} ${result.toString() === expect.toString() ? '✅' : '❌'}`);
})
// @lc code=end

