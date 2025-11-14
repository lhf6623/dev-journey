/*
 * @lc app=leetcode.cn id=3228 lang=javascript
 *
 * [3228] 将 1 移动到末尾的最大操作次数
 */

// @lc code=start
/**
 * @param {string} s
 * @return {number}
 */
var maxOperations = function (s) {
  let nums = 0;
  let ans = 0;
  let i = 0;
  while (i < s.length) {
    if (s[i] === '1') {
      nums += 1;
      i++;
    } else if (s[i] === '0') {
      while (i < s.length && s[i] === '0') {
        i++;
      }
      ans += nums;
    }
  }
  return ans;
};

const test = [
  [['1010'], 3],
  [["1001101"], 4],
  [["00111"], 0],
].forEach(([items, expect]) => {
  console.time('执行耗时');
  const result = maxOperations(...items);
  console.log(`结果：${result} ${result.toString() === expect.toString() ? '✅' : '❌'}`);
  console.timeEnd('执行耗时');
})
// @lc code=end

