/*
 * @lc app=leetcode.cn id=1625 lang=javascript
 *
 * [1625] 执行操作后字典序最小的字符串
 */

// @lc code=start
/**
 * @param {string} s
 * @param {number} a
 * @param {number} b
 * @return {string}
 */
var findLexSmallestString = function (s, a, b) {
  const n = s.length;
  const vis = new Array(n).fill(false);
  let res = s;
  // 将 s 延长一倍，方便截取轮转后的字符串 t
  s = s + s;
  for (let i = 0; !vis[i]; i = (i + b) % n) {
    vis[i] = true;
    for (let j = 0; j < 10; j++) {
      let kLimit = b % 2 === 0 ? 0 : 9;
      for (let k = 0; k <= kLimit; k++) {
        // 每次进行累加之前，重新截取 t
        const t = [...s.slice(i, i + n)];
        for (let p = 1; p < n; p += 2) {
          t[p] = String.fromCharCode('0'.charCodeAt() + (t[p].charCodeAt() - '0'.charCodeAt() + j * a) % 10);
        }
        for (let p = 0; p < n; p += 2) {
          t[p] = String.fromCharCode('0'.charCodeAt() + (t[p].charCodeAt() - '0'.charCodeAt() + k * a) % 10);
        }
        const tStr = t.join('');
        if (tStr < res) {
          res = tStr;
        }
      }
    }
  }
  return res;
};

const test = [
  [["5525", 9, 2], "2050"],
  [["74", 5, 1], "24"],
  [["0011", 4, 2], "0011"],
]
test.forEach(([items, expect]) => {
  const result = findLexSmallestString(...items);
  console.log(`结果：${result} ${result.toString() === expect.toString() ? '✅' : '❌'}`);
})
// @lc code=end

