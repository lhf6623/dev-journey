/*
 * @lc app=leetcode.cn id=2125 lang=javascript
 *
 * [2125] 银行中的激光束数量
 */

// @lc code=start
/**
 * @param {string[]} bank
 * @return {number}
 */
var numberOfBeams = function (bank) {
  let last = 0, ans = 0;
  for (const line of bank) {
    const cnt = (line.match(/1/g) || []).length;
    if (cnt !== 0) {
      ans += last * cnt;
      last = cnt;
    }
  }
  return ans;
};
const test = [
  [[["011001", "000000", "010100", "001000"]], 8],
  [[["000", "111", "000"]], 0],
].forEach(([items, expect]) => {
  const result = numberOfBeams(...items);
  console.log(`结果：${result} ${result.toString() === expect.toString() ? '✅' : '❌'}`);
})
// @lc code=end

