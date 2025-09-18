/*
 * @lc app=leetcode.cn id=953 lang=javascript
 *
 * [953] 验证外星语词典
 */

// @lc code=start
/**
 * @param {string[]} words
 * @param {string} order
 * @return {boolean}
 */
var isAlienSorted = function (words, order) {
  const map = {};
  for (let i = 0; i < order.length; i++) {
    map[order[i]] = i;
  }
  for (let i = 1; i < words.length; i++) {
    let valid = false;
    for (let j = 0; j < words[i - 1].length && j < words[i].length; j++) {
      let prev = map[words[i - 1][j]];
      let curr = map[words[i][j]];
      if (prev < curr) {
        valid = true;
        break;
      } else if (prev > curr) {
        return false;
      }
    }
    if (!valid) {
      /* 比较两个字符串的长度 */
      if (words[i - 1].length > words[i].length) {
        return false;
      }
    }
  }

  return true;
};

console.log(
  isAlienSorted(["word", "world", "row"], "worldabcefghijkmnpqstuvxyz")
);

// @lc code=end
