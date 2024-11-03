/*
 * @lc app=leetcode.cn id=125 lang=javascript
 *
 * [125] 验证回文串
 */

// @lc code=start
/**
 * @param {string} s
 * @return {boolean}
 */
var isPalindrome = function (s) {
  if (!s.trim()) return true;
  let left = 0;
  let right = s.length - 1;
  while (left < right) {
    const leftChar = s[left].toLowerCase().trim();
    const rightChar = s[right].toLowerCase().trim();
    if (!leftChar.trim() || !is_a_z(leftChar)) {
      left++;
      continue;
    }
    if (!rightChar.trim() || !is_a_z(rightChar)) {
      right--;
      continue;
    }

    if (leftChar !== rightChar) return false;
    left++;
    right--;
  }
  return true;
};

function is_a_z(item) {
  if (item >= "0" && item <= "9") return true;
  return item >= "a" && item <= "z";
}
const p = isPalindrome("0p ");
console.log(`🚀 ~ p:`, p);

// @lc code=end
