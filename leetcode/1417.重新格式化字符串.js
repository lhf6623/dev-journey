/*
 * @lc app=leetcode.cn id=1417 lang=javascript
 *
 * [1417] 重新格式化字符串
 */

// @lc code=start
/**
 * @param {string} s
 * @return {string}
 */
var reformat = function (s) {
  let s_num = [];
  let n_num = [];
  for (let i = 0; i < s.length; i++) {
    if (s[i] < 10) {
      n_num.push(s[i]);
    } else {
      s_num.push(s[i]);
    }
  }
  const diff = Math.abs(s_num.length - n_num.length);
  if (diff > 1) return "";
  if (s_num.length > n_num.length) {
    return s_num.flatMap(item => [item, n_num.shift()]).join('');
  }
  return n_num.flatMap(item => [item, s_num.shift()]).join('');
};
const test = [
  [["a0b1c2"], "0a1b2c"],
  [["leetcode"], ""],
  [["1229857369"], ""],
  [["covid2019"], "c2o0v1i9d"],
  [["ab123"], "1a2b3"],
].forEach(([items, expect]) => {
  const result = reformat(...items);
  console.log(`结果：${result} ${result.toString() === expect.toString() ? '✅' : '❌'}`);
})
// @lc code=end

