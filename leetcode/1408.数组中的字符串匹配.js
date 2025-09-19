/*
 * @lc app=leetcode.cn id=1408 lang=javascript
 *
 * [1408] 数组中的字符串匹配
 */

// @lc code=start
/**
 * @param {string[]} words
 * @return {string[]}
 */
var stringMatching = function (words) {
  let arr = [];
  words.sort((a, b) => a.length - b.length);
  let left = 0;
  while (left < words.length) {
    for (let i = left + 1; i < words.length; i++) {
      if (words[i].includes(words[left])) {
        arr.push(words[left]);
        break;
      }
    }
    left++;
  }
  return arr;
};

console.log(stringMatching(["leetcoder", "leetcode", "od", "hamlet", "am"]));

// @lc code=end
