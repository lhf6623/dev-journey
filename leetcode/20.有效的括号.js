/*
 * @lc app=leetcode.cn id=20 lang=javascript
 *
 * [20] 有效的括号
 */

// @lc code=start
/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function (s) {
  const map = {
    ")": "(",
    "]": "[",
    "}": "{",
  };
  const stack = [s[0]];
  for (let i = 1; i < s.length; i++) {
    if (map[s[i]] === stack.at(-1) && map[s[i]]) {
      stack.pop();
      continue;
    }
    stack.push(s[i]);
  }
  console.log(stack);

  return stack.length === 0;
};
const v = isValid("()[]{}");
console.log(`🚀 ~ v:`, v);
// @lc code=end
