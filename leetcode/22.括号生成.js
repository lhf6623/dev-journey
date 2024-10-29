/*
 * @lc app=leetcode.cn id=22 lang=javascript
 *
 * [22] 括号生成
 */

// @lc code=start
/**
 * @param {number} n
 * @return {string[]}
 */
var generateParenthesis = function (n) {
  // 全排列, 没思路，通义灵码提示的
  const res = [];
  const dfs = (s, left, right) => {
    if (left === 0 && right === 0) {
      res.push(s);
      return;
    }
    if (left > 0) dfs(s + "(", left - 1, right);
    if (right > left) dfs(s + ")", left, right - 1);
  };
  return dfs("", n, n), res;
};
const g = generateParenthesis(3);
console.log(`🚀 ~ g:`, g);

// @lc code=end
