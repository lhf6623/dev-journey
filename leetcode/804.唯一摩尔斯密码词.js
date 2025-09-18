/*
 * @lc app=leetcode.cn id=804 lang=javascript
 *
 * [804] 唯一摩尔斯密码词
 */

// @lc code=start
/**
 * @param {string[]} words
 * @return {number}
 */
var uniqueMorseRepresentations = function (words) {
  const morse = [
    ".-",
    "-...",
    "-.-.",
    "-..",
    ".",
    "..-.",
    "--.",
    "....",
    "..",
    ".---",
    "-.-",
    ".-..",
    "--",
    "-.",
    "---",
    ".--.",
    "--.-",
    ".-.",
    "...",
    "-",
    "..-",
    "...-",
    ".--",
    "-..-",
    "-.--",
    "--..",
  ];
  let set = new Set();
  for (let i = 0; i < words.length; i++) {
    const item = words[i];
    let new_item = "";
    for (let j = 0; j < item.length; j++) {
      new_item += morse[item.charCodeAt(j) - 97];
    }
    set.add(new_item);
  }
  return set.size;
};

console.log(uniqueMorseRepresentations(["gin", "zen", "gig", "msg"]));

// @lc code=end
