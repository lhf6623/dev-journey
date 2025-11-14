/*
 * @lc app=leetcode.cn id=387 lang=javascript
 *
 * [387] 字符串中的第一个唯一字符
 */

// @lc code=start
/**
 * @param {string} s
 * @return {number}
 */
var firstUniqChar = function (s) {
  for (let i = 0; i < s.length; i++) {
    if (s.indexOf(s[i]) === s.lastIndexOf(s[i])) {
      return i;
    }
  }
  return -1;
  // let map = new Map();
  // for (let i = 0; i < s.length; i++) {
  //   if (map.has(s[i])) {
  //     map.set(s[i], -1);
  //   } else {
  //     map.set(s[i], i);
  //   }
  // }
  // let res = Infinity;
  // for (let [key, value] of map) {
  //   if (value !== -1 && value < res) {
  //     res = value;
  //     break;
  //   }
  // }
  // return res === Infinity ? -1 : res;
};
const test = [
  [["leetcode"], 0],
  [["loveleetcode"], 2],
  [["aabb"], -1]
].forEach(([items, expect]) => {
  const result = firstUniqChar(...items);
  console.log(`结果：${result} ${result.toString() === expect.toString() ? '✅' : '❌'}`);
})
// @lc code=end

