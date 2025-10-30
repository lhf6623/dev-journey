/*
 * @lc app=leetcode.cn id=2273 lang=javascript
 *
 * [2273] 移除字母异位词后的结果数组
 */

// @lc code=start
/**
 * @param {string[]} words
 * @return {string[]}
 */
var removeAnagrams = function (words) {
  let right = words.length - 1;
  let r = words[right].split("").sort().join("");

  while (words.length > 1 && right > 0) {
    const l = words[right - 1].split("").sort().join("");
    if (r === l) {
      words.splice(right, 1);
    }
    r = l;
    right--;
  }
  return words;
};

const test = [
  [[["abba", "baba", "bbaa", "cd", "cd"]], ["abba", "cd"]],
  [[["a", "b", "c", "d", "e"]], ["a", "b", "c", "d", "e"]],
]
test.forEach(([items, expect]) => {
  const result = removeAnagrams(...items);
  console.log(`结果：${result} ${result.toString() === expect.toString() ? '✅' : '❌'}`);
})
// @lc code=end

