/*
 * @lc app=leetcode.cn id=1592 lang=javascript
 *
 * [1592] 重新排列单词间的空格
 */

// @lc code=start
/**
 * @param {string} text
 * @return {string}
 */
var reorderSpaces = function (text) {
  const words = text.split(" ").filter(item => item);
  const space = (text.length - words.join('').length)
  const s = words.length - 1 === 0 ? 1 : Math.floor(space / (words.length - 1));

  const l = words.length - 1 === 0 ? space : Math.ceil(space % (words.length - 1))
  let l_space_string = '';
  for (let i = 0; i < l; i++) {
    l_space_string += ' ';
  }

  let space_string = '';
  for (let i = 0; i < s; i++) {
    space_string += ' ';
  }

  return words.join(space_string) + l_space_string;
};
const test = [
  [["a b c "], "a b c "],
  [["  hello"], "hello  "],
  [["  this   is  a sentence "], "this   is   a   sentence"],
  [[" practice   makes   perfect"], "practice   makes   perfect "],
  [["hello   world"], "hello   world"],
  [["  walks  udp package   into  bar a"], "walks  udp  package  into  bar  a "],
  [["a"], "a"],
].forEach(([items, expect]) => {
  const result = reorderSpaces(...items);
  console.log(`结果：${result} ${result.toString() === expect.toString() ? '✅' : '❌'}`);
})
// @lc code=end

