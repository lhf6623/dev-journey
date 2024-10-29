/*
 * @lc app=leetcode.cn id=10 lang=javascript
 *
 * [10] 正则表达式匹配
 */

// @lc code=start
/**
 * @param {string} s
 * @param {string} p
 * @return {boolean}
 */
var isMatch = function (s, p) {
  // 还是复制题解吧。。。
  let m = s.length;
  let n = p.length;
  let f = new Array(m + 1).fill(false).map(() => new Array(n + 1).fill(false));
  f[0][0] = true;
  for (let i = 0; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (p.charAt(j - 1) === "*") {
        f[i][j] = f[i][j - 2];
        if (matches(s, p, i, j - 1)) {
          f[i][j] = f[i][j] || f[i - 1][j];
        }
      } else {
        if (matches(s, p, i, j)) {
          f[i][j] = f[i - 1][j - 1];
        }
      }
    }
  }
  return f[m][n];
};
function matches(s, p, i, j) {
  if (i == 0) {
    return false;
  }
  if (p.charAt(j - 1) === ".") {
    return true;
  }
  return s.charAt(i - 1) === p.charAt(j - 1);
}
const m = isMatch("mississippi", "mis*is*p.*");
console.log(m);
// @lc code=end
