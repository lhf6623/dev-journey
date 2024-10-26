/*
 * @lc app=leetcode.cn id=5 lang=javascript
 *
 * [5] 最长回文子串
 */

// @lc code=start
/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function (s) {
  // O(N**2)
  let res = "";
  let temp = "";

  for (let i = 0; i < s.length; i++) {
    let right = i + 1;
    let left = i - 1;
    temp = s[i];

    res = !res ? temp : res;
    while (true) {
      // 全部相同
      const isOnlyOne = new Set(temp).size === 1;
      if (isOnlyOne && (s[left] === temp[0] || s[right] === temp[0])) {
        if (temp[0] === s[right]) {
          temp += s[right];
          right++;
          i += 1;
        }
        if (temp[0] === s[left]) {
          temp = s[left] + temp;
          left--;
        }
        res = temp.length > res.length ? temp : res;
        if (res.length === s.length) return s;
        continue;
      }
      if (s[left] === undefined && s[right] === undefined) break;

      if (s[left] === s[right]) {
        temp = s[left] + temp + s[right];
        left--;
        right++;
        res = temp.length > res.length ? temp : res;
        if (res.length === s.length) return s;
      } else {
        break;
      }
    }
  }
  return res;
};

const l = longestPalindrome("abcaacba");
console.log(`🚀 ~ l:`, l);
// aaaaaa
// aaaaaa

// @lc code=end
