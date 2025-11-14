/*
 * @lc app=leetcode.cn id=482 lang=javascript
 *
 * [482] 密钥格式化
 */

// @lc code=start
/**
 * @param {string} s
 * @param {number} k
 * @return {string}
 */
var licenseKeyFormatting = function (s, k) {
  let res = "";
  let count = 0;
  for (let i = s.length - 1; i >= 0; i--) {
    if (s[i] === "-") continue;
    res = s[i].toUpperCase() + res;
    count++;
    if (count === k) {
      res = "-" + res;
      count = 0;
    }
  }
  if (count) {
    res = s[0] + res;
  }
  return res.slice(1);
};
const test = [
  [["2-4A0r7-4k", 3], "24-A0R-74K"],
  [["5F3Z-2e-9-w", 4], "5F3Z-2E9W"],
  [["2-5g-3-J", 2], "2-5G-3J"],
].forEach(([items, expect]) => {
  const result = licenseKeyFormatting(...items);
  console.log(`结果：${result} ${result.toString() === expect.toString() ? '✅' : '❌'}`);
})
// @lc code=end

