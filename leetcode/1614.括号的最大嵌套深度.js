/*
 * @lc app=leetcode.cn id=1614 lang=javascript
 *
 * [1614] 括号的最大嵌套深度
 */

// @lc code=start
/**
 * @param {string} s
 * @return {number}
 */
var maxDepth = function (s) {
  let ans = 0;
  let depth = 0;
  for (let i = 0; i < s.length; i++) {
    if (s[i] === '(') {
      depth++;
      ans = Math.max(ans, depth);
    } else if (s[i] === ')') {
      depth--;
    }
  }
  return ans;
};
const test = [
  [["(1+(2*3)+((8)/4))+1"], 3],
  [["(1)+((2))+(((3)))"], 3],
  [["()(())((()()))"], 3],
].forEach(([items, expect]) => {
  const result = maxDepth(...items);
  console.log(`结果：${result} ${result.toString() === expect.toString() ? '✅' : '❌'}`);
})
// @lc code=end

