/*
 * @lc app=leetcode.cn id=819 lang=javascript
 *
 * [819] 最常见的单词
 */

// @lc code=start
/**
 * @param {string} paragraph
 * @param {string[]} banned
 * @return {string}
 */
var mostCommonWord = function (paragraph, banned) {
  let map = new Map();
  let max = ["", 0];
  const paragraph_arr = paragraph.replace(/[!?',;.]/g, " ").split(" ");
  for (let i = 0; i < paragraph_arr.length; i++) {
    const item = paragraph_arr[i].toLocaleLowerCase();

    if (item && !banned.includes(item)) {
      map[item] = (map[item] || 0) + 1;
      if (map[item] > max[1]) {
        max = [item, map[item]];
      }
    }
  }
  return max[0];
};

const a = mostCommonWord(
  "Bob hit a ball, the hit BALL flew far after it was hit.",
  ["hit"]
);
console.log(a);

// @lc code=end
