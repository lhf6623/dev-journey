/*
 * @lc app=leetcode.cn id=3168 lang=javascript
 *
 * [3168] 候诊室中的最少椅子数
 */

// @lc code=start
/**
 * @param {string} s
 * @return {number}
 */
var minimumChairs = function (s) {
  let count = 0;
  let res = 0;
  for (let i = 0; i < s.length; i++) {
    if (s[i] === "E") {
      count += 1;
      res = Math.max(res, count);
    } else {
      count -= 1;
    }
  }
  return res;
};
const test = [
  [["EEEEEEE"], 7],
  [["ELELEEL"], 2],
  [["ELEELEELLL"], 3],
].forEach(([items, expect]) => {
  const result = minimumChairs(...items);
  console.log(`结果：${result} ${result.toString() === expect.toString() ? '✅' : '❌'}`);
})
// @lc code=end

