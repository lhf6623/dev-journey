/*
 * @lc app=leetcode.cn id=1370 lang=javascript
 *
 * [1370] 上升下降字符串
 */

// @lc code=start
/**
 * @param {string} s
 * @return {string}
 */
var sortString = function (s) {
  const map = new Map();
  for (let i = 0; i < s.length; i++) {
    map.set(s[i], (map.get(s[i]) || 0) + 1);
  }

  let s_arr = [...map.keys()].sort((a, b) => a.charCodeAt() - b.charCodeAt());
  let is_asc = true;
  let res = '';
  while (map.size) {
    if (map.size !== s_arr.length) {
      s_arr = [...map.keys()].sort((a, b) => a.charCodeAt() - b.charCodeAt());
    }
    for (let i = 0; i < s_arr.length; i++) {
      const item = s_arr[i];
      const num = map.get(item) - 1;
      if (num <= 0) {
        map.delete(item);
      } else {
        map.set(item, num);
      }
    }
    res += is_asc ? s_arr.join('') : s_arr.toReversed().join('');
    is_asc = !is_asc;
  }
  return res;
};
const test = [
  [["leetcode"], 'cdelotee'],
  [["aaaabbbbcccc"], "abccbaabccba"],
  [["rat"], "art"],
].forEach(([items, expect]) => {
  const result = sortString(...items);
  console.log(`结果：${result} ${result.toString() === expect.toString() ? '✅' : '❌'}`);
})
// @lc code=end

