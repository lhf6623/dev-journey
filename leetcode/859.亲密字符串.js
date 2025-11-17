/*
 * @lc app=leetcode.cn id=859 lang=javascript
 *
 * [859] 亲密字符串
 */

// @lc code=start
/**
 * @param {string} s
 * @param {string} goal
 * @return {boolean}
 */
var buddyStrings = function (s, goal) {
  if (s.length !== goal.length) return false;

  let diff = [];
  for (let i = 0; i < s.length; i++) {
    if (s[i] !== goal[i]) {
      const str = `${s[i]}_${goal[i]}`;
      if (diff.length === 0) {
        diff.push(str);
      } else if (diff.length === 1) {
        if (diff[0] === `${goal[i]}_${s[i]}`) {
          diff.push(str);
        } else {
          return false;
        }
      } else if (diff.length > 1) {
        return false;
      }
    }
  }
  if (s === goal) {
    let repeatCount = [...new Set(s.split(""))];
    return repeatCount.length !== s.length;
  } else {
    return diff.length !== 1;
  }
};
const test = [
  [["abac", "abad"], false],
  [["ab", "ba"], true],
  [["ab", "ab"], false],
  [["aa", "aa"], true],
].forEach(([items, expect]) => {
  const result = buddyStrings(...items);
  console.log(`结果：${result} ${result.toString() === expect.toString() ? '✅' : '❌'}`);
})
// @lc code=end

