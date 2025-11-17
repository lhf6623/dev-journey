/*
 * @lc app=leetcode.cn id=1021 lang=javascript
 *
 * [1021] 删除最外层的括号
 */

// @lc code=start
/**
 * @param {string} s
 * @return {string}
 */
var removeOuterParentheses = function (s) {
  let count = 0;
  let res = "";
  for (const c of s) {
    if (c === "(" && count++ > 0) {
      res += c;
    }
    if (c === ")" && count-- > 1) {
      res += c;
    }
  }
  return res;
};
const test = [
  [["(()())(())"], "()()()"],
  [["(()())(())(()(()))"], "()()()()(())"],
  [["()()"], ""],
].forEach(([items, expect]) => {
  const result = removeOuterParentheses(...items);
  console.log(`结果：${result} ${result.toString() === expect.toString() ? '✅' : '❌'}`);
})
// @lc code=end

