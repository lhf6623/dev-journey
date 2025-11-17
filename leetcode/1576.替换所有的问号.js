/*
 * @lc app=leetcode.cn id=1576 lang=javascript
 *
 * [1576] 替换所有的问号
 */

// @lc code=start
/**
 * @param {string} s
 * @return {string}
 */
var modifyString = function (s) {
  let count = 0;
  let res = "";
  while (count < s.length) {
    if (s[count] === "?") {
      let left = count + 1;
      while (s[left] === "?") {
        left++;
      }
      const code = getCode(left - count, s[count - 1], s[left])
      res += code;
      count = left;
      continue;
    } else {
      res += s[count];
    }
    count++;
  }
  return res;
};
function getCode(n, f, l) {
  let code = '';
  let i = 0;
  while (code.length < n) {
    const _code = String.fromCharCode(i % 26 + 97);
    if (_code === f || _code === l) {
      i++;
      continue;
    }
    i++;
    code += _code;
  }
  return code;
}
const test = [
  [["j?qg??b"], "jaqgacb"],
  [["?zs"], "azs"],
  [["ubv?w"], "ubvaw"],
].forEach(([items, expect]) => {
  const result = modifyString(...items);
  console.log(`结果：${result} ${result.toString() === expect.toString() ? '✅' : '❌'}`);
})
// @lc code=end

