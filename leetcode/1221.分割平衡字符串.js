/*
 * @lc app=leetcode.cn id=1221 lang=javascript
 *
 * [1221] 分割平衡字符串
 */

// @lc code=start
/**
 * @param {string} s
 * @return {number}
 */
var balancedStringSplit = function (s) {
  let ans = 0;
  let count = 0;
  for (let i = 0; i < s.length; i++) {
    if (s[i] === 'R') {
      count++;
    } else {
      count--;
    }
    if (count === 0) {
      ans++;
    }
  }
  return ans;
};
const test = [
  [["RLRRLLRLRL"], 4],
  [["RLRRRLLRLL"], 2],
  [["LLLLRRRR"], 1],
].forEach(([items, expect]) => {
  const result = balancedStringSplit(...items);
  console.log(`结果：${result} ${result.toString() === expect.toString() ? '✅' : '❌'}`);
})
// @lc code=end

