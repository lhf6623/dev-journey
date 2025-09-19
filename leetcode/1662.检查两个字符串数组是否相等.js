/*
 * @lc app=leetcode.cn id=1662 lang=javascript
 *
 * [1662] 检查两个字符串数组是否相等
 */

// @lc code=start
/**
 * @param {string[]} word1
 * @param {string[]} word2
 * @return {boolean}
 */
var arrayStringsAreEqual = function (word1, word2) {
  // return word1.join("") === word2.join("");
  let w1 = word1.shift();
  let w2 = word2.shift();

  while (word1.length || word2.length) {
    if (w1.length === w2.length) {
      if (w1 !== w2) return false;
      w1 += word1.shift() || "";
      w2 += word2.shift() || "";
    }

    if (w1.length > w2.length) {
      if (!w1.includes(w2)) return false;
      const item = word2.shift();
      if (!item) return false;
      w2 += item;
    }
    if (w1.length < w2.length) {
      if (!w2.includes(w1)) return false;
      const item = word1.shift();
      if (!item) return false;
      w1 += item;
    }
  }
  return w1 === w2;
};

console.log(
  arrayStringsAreEqual(
    ["jj", "pfiaofefnkbrxoh", "zhq", "m"],
    ["jjpfiaofefn", "kbr", "x", "o", "hzh", "m", "g"]
  )
);

// @lc code=end
