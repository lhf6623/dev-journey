/*
 * @lc app=leetcode.cn id=680 lang=javascript
 *
 * [680] 验证回文串 II
 */

// @lc code=start
/**
 * @param {string} s
 * @return {boolean}
 */
var validPalindrome = function (s) {
  let i = 0,
    j = s.length - 1;
  let isValid = true;
  let res = true;
  while (i <= j) {
    if (s[i] !== s[j]) {
      if (isValid) {
        isValid = false;
        j--;
      } else {
        res = false;
        break;
      }
    } else {
      i++;
      j--;
    }
  }
  if (!res) {
    res = true;
    isValid = true;
    i = 0;
    j = s.length - 1;
    while (i <= j) {
      if (s[i] !== s[j]) {
        if (isValid) {
          isValid = false;
          i++;
        } else {
          res = false;
          break;
        }
      } else {
        i++;
        j--;
      }
    }
  }
  return res;
};
const test = [
  [["deeee"], true],
  [["aba"], true],
  [["abca"], true],
  [["abc"], false],
].forEach(([items, expect]) => {
  const result = validPalindrome(...items);
  console.log(`结果：${result} ${result.toString() === expect.toString() ? '✅' : '❌'}`);
})
// @lc code=end

