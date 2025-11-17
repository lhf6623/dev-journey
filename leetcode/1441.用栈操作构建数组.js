/*
 * @lc app=leetcode.cn id=1441 lang=javascript
 *
 * [1441] 用栈操作构建数组
 */

// @lc code=start
/**
 * @param {number[]} target
 * @param {number} n
 * @return {string[]}
 */
var buildArray = function (target, n) {
  const ret = [];
  let i = 1;
  for (const num of target) {
    while (i < num) {
      ret.push('Push', 'Pop');
      i++;
    }
    ret.push('Push');
    i++;
  }
  return ret;
};
const test = [
  [[[1, 3], 3], ["Push", "Push", "Pop", "Push"]],
  [[[1, 2, 3], 3], ["Push", "Push", "Push"]],
  [[[1, 2], 4], ["Push", "Push"]]
].forEach(([items, expect]) => {
  const result = buildArray(...items);
  console.log(`结果：${result} ${result.toString() === expect.toString() ? '✅' : '❌'}`);
})
// @lc code=end

