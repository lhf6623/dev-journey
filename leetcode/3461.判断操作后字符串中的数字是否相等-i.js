/*
 * @lc app=leetcode.cn id=3461 lang=javascript
 *
 * [3461] 判断操作后字符串中的数字是否相等 I
 */

// @lc code=start
/**
 * @param {string} s
 * @return {boolean}
 */
var hasSameDigits = function (s) {
  s = s.split("").map(Number);
  while (s.length > 2) {
    let temp = [];
    for (let i = 0; i < s.length - 1; i++) {
      temp.push((s[i] + s[i + 1]) % 10);
    }
    s = temp;
  }
  return s[0] === s[1];
};

const test = [
  [["3902"], true],
  [["34789"], false],
].forEach(([items, expect]) => {
  const result = hasSameDigits(...items);
  console.log(`结果：${result} ${result.toString() === expect.toString() ? '✅' : '❌'}`);
})
// @lc code=end

