/*
 * @lc app=leetcode.cn id=2654 lang=javascript
 *
 * [2654] 使数组所有元素变成 1 的最少操作次数
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var minOperations = function (nums) {
  const n = nums.length;
  let num1 = 0;
  let g = 0;

  const gcd = (a, b) => {
    while (b !== 0) {
      const temp = b;
      b = a % b;
      a = temp;
    }
    return a;
  };

  for (const x of nums) {
    if (x === 1) {
      num1++;
    }
    g = gcd(g, x);
  }

  if (num1 > 0) {
    return n - num1;
  }
  if (g > 1) {
    return -1;
  }

  let minLen = n;
  for (let i = 0; i < n; i++) {
    let currentGcd = 0;
    for (let j = i; j < n; j++) {
      currentGcd = gcd(currentGcd, nums[j]);
      if (currentGcd === 1) {
        minLen = Math.min(minLen, j - i + 1);
        break;
      }
    }
  }
  return minLen + n - 2;
};

const test = [
  [[[2, 6, 3, 4]], 4],
  [[[2, 10, 6, 14]], -1],
].forEach(([items, expect]) => {
  const result = minOperations(...items);
  console.log(`结果：${result} ${result.toString() === expect.toString() ? '✅' : '❌'}`);
})
// @lc code=end

