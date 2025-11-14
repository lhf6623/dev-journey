/*
 * @lc app=leetcode.cn id=3542 lang=javascript
 *
 * [3542] 将所有元素变为 0 的最少操作次数
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var minOperations = function (nums) {
  const s = [];
  let res = 0;
  for (const a of nums) {
    while (s.length && s[s.length - 1] > a) {
      s.pop();
    }
    if (a === 0) continue;
    if (!s.length || s[s.length - 1] < a) {
      res++;
      s.push(a);
    }
  }
  return res;
};

const test = [
  [[[0, 2]], 1],
  [[[3, 1, 2, 1]], 3],
  [[[1, 2, 1, 2, 1, 2]], 4]
].forEach(([items, expect]) => {
  const result = minOperations(...items);
  console.log(`结果：${result} ${result.toString() === expect.toString() ? '✅' : '❌'}`);
})
// @lc code=end

