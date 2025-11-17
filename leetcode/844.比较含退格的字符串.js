/*
 * @lc app=leetcode.cn id=844 lang=javascript
 *
 * [844] 比较含退格的字符串
 */

// @lc code=start
/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var backspaceCompare = function (s, t) {
  const s_arr = [];
  const t_arr = [];
  for (let i = 0; i < s.length; i++) {
    if (s[i] === "#") {
      s_arr.pop();
    } else {
      s_arr.push(s[i]);
    }
  }
  for (let i = 0; i < t.length; i++) {
    if (t[i] === "#") {
      t_arr.pop();
    } else {
      t_arr.push(t[i]);
    }
  }
  return s_arr.join('') === t_arr.join('');
};
const test = [
  [["ab#c", "ad#c"], true],
  [["ab##", "c#d#"], true],
  [["a#c", "b"], false],
].forEach(([items, expect]) => {
  const result = backspaceCompare(...items);
  console.log(`结果：${result} ${result.toString() === expect.toString() ? '✅' : '❌'}`);
})
// @lc code=end

