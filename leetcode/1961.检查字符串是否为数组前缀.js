/*
 * @lc app=leetcode.cn id=1961 lang=javascript
 *
 * [1961] 检查字符串是否为数组前缀
 */

// @lc code=start
/**
 * @param {string} s
 * @param {string[]} words
 * @return {boolean}
 */
var isPrefixString = function (s, words) {
  let res = "";
  for (const word of words) {
    res += word;
    if (!s.startsWith(res)) return false;
    if (res === s) return true;
  }
  return false;
};

const test = [
  ["iloveleetcode", ["i", "love", "leetcode", "apples"], true],
  ["iloveleetcode", ["apples", "i", "love", "leetcode"], false],
  ["applebananacookie", ["banana", "apple", "cookie"], false],
  ["ccccccccc", ["c", "cc"], false],
];
test.forEach(([s, words, expect]) => {
  const result = isPrefixString(s, words);
  console.log(
    `测试用例: ${(s, words)}: ${expect === result ? "通过" : "未通过"}`
  );
});
// @lc code=end
