/*
 * @lc app=leetcode.cn id=2073 lang=javascript
 *
 * [2073] 买票需要的时间
 */

// @lc code=start
/**
 * @param {number[]} tickets
 * @param {number} k
 * @return {number}
 */
var timeRequiredToBuy = function (tickets, k) {
  let count = 0;
  while (tickets[k]) {
    for (let i = 0; i < tickets.length; i++) {
      if (tickets[i]) {
        tickets[i]--;
        count++;
        if (i === k && !tickets[i]) break;
      }
    }
  }
  return count;
};
const test = [
  [[[2, 3, 2], 2], 6],
  [[[5, 1, 1, 1], 0], 8],
].forEach(([items, expect]) => {
  const result = timeRequiredToBuy(...items);
  console.log(`结果：${result} ${result.toString() === expect.toString() ? '✅' : '❌'}`);
})
// @lc code=end

