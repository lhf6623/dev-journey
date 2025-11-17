/*
 * @lc app=leetcode.cn id=1544 lang=javascript
 *
 * [1544] 整理字符串
 */

// @lc code=start
/**
 * @param {string} s
 * @return {string}
 */
var makeGood = function (s) {
  const stack = [];
  for (let i = 0; i < s.length; i++) {
    const item = s[i];
    const last = stack[stack.length - 1];
    if (stack.length && item !== last && item.toLowerCase() === last.toLowerCase()) {
      stack.pop();
    } else {
      stack.push(s[i]);
    }
  }
  return stack.join('');
};
const test = [
  [["leEeetcode"], "leetcode"],
  [["abBAcC"], ''],
  [["s"], "s"],
].forEach(([items, expect]) => {
  const result = makeGood(...items);
  console.log(`结果：${result} ${result.toString() === expect.toString() ? '✅' : '❌'}`);
})
// @lc code=end

