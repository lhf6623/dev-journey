/*
 * @lc app=leetcode.cn id=71 lang=javascript
 *
 * [71] 简化路径
 */

// @lc code=start
/**
 * @param {string} path
 * @return {string}
 */
var simplifyPath = function (path) {
  const res = [];
  const paths = path.split("/");
  for (let i = 0; i < paths.length; i++) {
    const p = paths[i];
    if (p === "." || p === "") continue;
    if (p === "..") {
      res.pop();
    } else {
      res.push(p);
    }
  }
  return "/" + res.join("/");
};

const s = simplifyPath("/.../a/../b/c/../d/./");
console.log(`🚀 ~ s:`, s);

// @lc code=end
