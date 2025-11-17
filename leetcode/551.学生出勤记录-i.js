/*
 * @lc app=leetcode.cn id=551 lang=javascript
 *
 * [551] 学生出勤记录 I
 */

// @lc code=start
/**
 * @param {string} s
 * @return {boolean}
 */
var checkRecord = function (s) {
  let aCount = 0;
  let lCount = 0;
  for (let i = 0; i < s.length; i++) {
    if (s[i] === 'A') {
      aCount++;
      if (aCount > 1) return false;
    }
    if (s[i] === 'L') {
      lCount++;
      if (lCount > 2) return false;
    } else {
      lCount = 0;
    }
  }
  return true;
};
const test = [
  [["PPALLP"], true],
  [["PPALLL"], false],
].forEach(([items, expect]) => {
  const result = checkRecord(...items);
  console.log(`结果：${result} ${result.toString() === expect.toString() ? '✅' : '❌'}`);
})
// @lc code=end

