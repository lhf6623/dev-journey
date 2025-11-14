/*
 * @lc app=leetcode.cn id=345 lang=javascript
 *
 * [345] 反转字符串中的元音字母
 */

// @lc code=start
/**
 * @param {string} s
 * @return {string}
 */
var reverseVowels = function (s) {
  let i = 0,
    j = s.length - 1;
  s = s.split("");
  const vowels = new Set(["a", "e", "i", "o", "u", "A", "E", "I", "O", "U"]);
  while (i < j) {
    while (i < j && !vowels.has(s[i])) i++;
    while (i < j && !vowels.has(s[j])) j--;
    [s[i], s[j]] = [s[j], s[i]];
    i++;
    j--;
  }
  return s.join("");
};
const test = [
  [["IceCreAm"], "AceCreIm"],
  [["leetcode"], "leotcede"],
].forEach(([items, expect]) => {
  const result = reverseVowels(...items);
  console.log(`结果：${result} ${result.toString() === expect.toString() ? '✅' : '❌'}`);
})
// @lc code=end

