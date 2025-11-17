/*
 * @lc app=leetcode.cn id=557 lang=javascript
 *
 * [557] 反转字符串中的单词 III
 */

// @lc code=start
/**
 * @param {string} s
 * @return {string}
 */
var reverseWords = function (s) {
  return s.split(' ').map(item => item.split('').reverse().join('')).join(' ');
};
const test = [
  [["Let's take LeetCode contest"], "s'teL ekat edoCteeL tsetnoc"],
  [["Mr Ding"], "rM gniD"],
].forEach(([items, expect]) => {
  const result = reverseWords(...items);
  console.log(`结果：${result} ${result.toString() === expect.toString() ? '✅' : '❌'}`);
})
// @lc code=end

