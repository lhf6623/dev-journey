/*
 * @lc app=leetcode.cn id=383 lang=javascript
 *
 * [383] 赎金信
 */

// @lc code=start
/**
 * @param {string} ransomNote
 * @param {string} magazine
 * @return {boolean}
 */
var canConstruct = function (ransomNote, magazine) {
  const ransomNoteMap = new Map();
  for (const char of ransomNote) {
    ransomNoteMap.set(char, (ransomNoteMap.get(char) || 0) + 1);
  }
  for (const char of magazine) {
    if (ransomNoteMap.has(char)) {
      const num = ransomNoteMap.get(char) - 1;
      ransomNoteMap.set(char, num);
      if (num === 0) {
        ransomNoteMap.delete(char);
        if (ransomNoteMap.size === 0) {
          return true;
        }
      }
    }
  }
  return ransomNoteMap.size === 0;
};
const test = [
  [["a", "b"], false],
  [["aa", "ab"], false],
  [["aa", "aab"], true]
].forEach(([items, expect]) => {
  const result = canConstruct(...items);
  console.log(`结果：${result} ${result.toString() === expect.toString() ? '✅' : '❌'}`);
})
// @lc code=end

