/*
 * @lc app=leetcode.cn id=67 lang=javascript
 *
 * [67] 二进制求和
 */

// @lc code=start
/**
 * @param {string} a
 * @param {string} b
 * @return {string}
 */
var addBinary = function (a, b) {
  const n = Math.max(a.length, b.length);
  const l1 = a.length - 1;
  const l2 = b.length - 1;
  let carry = 0;
  let ans = '';

  for (let i = 0; i < n; i++) {
    const n1 = Number(a[l1 - i]) || 0;
    const n2 = Number(b[l2 - i]) || 0;
    const num = n1 + n2 + carry;
    ans = `${num % 2}${ans}`;
    carry = Math.floor(num / 2);
  }
  return `${carry ? carry : ''}${ans}`;
};
const test = [
  [["11", "1"], "100"],
  [["1010", "1011"], "10101"],
].forEach(([items, expect]) => {
  const result = addBinary(...items);
  console.log(`结果：${result} ${result.toString() === expect.toString() ? '✅' : '❌'}`);
})
// @lc code=end

