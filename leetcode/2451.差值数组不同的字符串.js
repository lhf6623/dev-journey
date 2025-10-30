/*
 * @lc app=leetcode.cn id=2451 lang=javascript
 *
 * [2451] 差值数组不同的字符串
 */

// @lc code=start
/**
 * @param {string[]} words
 * @return {string}
 */
var oddString = function (words) {
  const map = new Map();
  for (let i = 0; i < words.length; i++) {
    const item = words[i];
    let temp = '';
    for (let i = 0; i < item.length - 1; i++) {
      temp = `${temp}${item[i + 1].charCodeAt() - item[i].charCodeAt()}`
    }
    if (map.has(temp)) {
      map.delete(temp);
    } else {
      map.set(temp, item);
    }
  }
  return [...map.values()][0];
};
const test = [
  [[["adc", "wzy", "abc"]], "abc"],
  [[["aaa", "bob", "ccc", "ddd"]], "bob"],
].forEach(([items, expect]) => {
  const result = oddString(...items);
  console.log(`结果：${result} ${result.toString() === expect.toString() ? '✅' : '❌'}`);
})
// @lc code=end

