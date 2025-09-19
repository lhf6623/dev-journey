/*
 * @lc app=leetcode.cn id=1002 lang=javascript
 *
 * [1002] 查找共用字符
 */

// @lc code=start
/**
 * @param {string[]} words
 * @return {string[]}
 */
var commonChars = function (words) {
  let arr = words[0].split("");
  for (let i = 1; i < words.length; i++) {
    let index = [];
    for (let j = 0; j < words[i].length; j++) {
      const item = words[i][j];
      const _index = arr.reduce((pre, cur, i) => {
        const _item = item === cur;
        if (_item && !index.includes(i)) {
          return i;
        }
        return pre;
      }, -1);
      if (_index !== -1) {
        index.push(_index);
      }
    }

    arr = index.map((item) => arr[item]);
  }
  return arr;
};
console.log(commonChars(["bella", "label", "roller"]));

// @lc code=end
