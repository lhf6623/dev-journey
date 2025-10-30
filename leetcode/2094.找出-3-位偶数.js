/*
 * @lc app=leetcode.cn id=2094 lang=javascript
 *
 * [2094] 找出 3 位偶数
 */

// @lc code=start
/**
 * @param {number[]} digits
 * @return {number[]}
 */
var findEvenNumbers = function (digits) {
  let result = [];
  const used = new Array(digits.length).fill(false);
  const evenNumbers = new Set([0, 2, 4, 6, 8]);

  digits.sort((a, b) => a - b);

  function backtrack(temp, used) {
    if (temp.length === 3) {
      if (temp[0] !== 0 && evenNumbers.has(temp[2])) {
        result.push([...temp]);
      }
      return;
    }

    for (let i = 0; i < digits.length; i++) {
      if (used[i]) continue;

      if (i > 0 && digits[i] === digits[i - 1] && !used[i - 1]) continue;

      temp.push(digits[i]);
      used[i] = true;

      backtrack(temp, used);

      temp.pop();
      used[i] = false;
    }
  }

  backtrack([], used);
  result = result.map(item => item.join('')).map(Number);

  return result;
};
const test = [
  [[[2, 1, 3, 0]], [102, 120, 130, 132, 210, 230, 302, 310, 312, 320]],
  [[[2, 2, 8, 8, 2]], [222, 228, 282, 288, 822, 828, 882]],
  [[[3, 7, 5]], []],
].forEach(([items, expect]) => {
  const result = findEvenNumbers(...items);
  console.log(`结果：${result} ${result.toString() === expect.toString() ? '✅' : '❌'}`);
})
// @lc code=end

