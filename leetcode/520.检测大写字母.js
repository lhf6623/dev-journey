/*
 * @lc app=leetcode.cn id=520 lang=javascript
 *
 * [520] 检测大写字母
 */

// @lc code=start
/**
 * @param {string} word
 * @return {boolean}
 */
var detectCapitalUse = function (word) {
  if (word.length === 1) return true;
  if (is_a_z(word[0]) && is_A_Z(word[1])) return false;

  // 前两个位为小写
  const is_all_lower = is_a_z(word[0]) && is_a_z(word[1]);
  // 首字母为大写
  const is_first_upper = is_A_Z(word[0]) && is_a_z(word[1]);
  const rule = is_all_lower || is_first_upper ? is_a_z : is_A_Z;

  for (let i = 2; i < word.length; i++) {
    const item = word[i];
    if (!rule(item)) return false;
  }
  return true;
};
function is_a_z(item) {
  return item >= "a" && item <= "z";
}
function is_A_Z(item) {
  return item >= "A" && item <= "Z";
}

const d = detectCapitalUse("Uaaaaa");
console.log(`🚀 ~ d:`, d);

// @lc code=end
