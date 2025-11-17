/*
 * @lc app=leetcode.cn id=1475 lang=javascript
 *
 * [1475] 商品折扣后的最终价格
 */

// @lc code=start
/**
 * @param {number[]} prices
 * @return {number[]}
 */
var finalPrices = function (prices) {
  let res = [...prices]
  const n = prices.length
  for (let i = 0; i < n; i++) {
    const item = prices[i]

    for (let j = i + 1; j < n; j++) {
      if (item >= prices[j]) {
        res[i] = item - prices[j]
        break
      }
    }
  }
  return res
};
const test = [
  [[[8, 4, 6, 2, 3]], [4, 2, 4, 2, 3]],
  [[[1, 2, 3, 4, 5]], [1, 2, 3, 4, 5]],
  [[[10, 1, 1, 6]], [9, 0, 1, 6]],
].forEach(([items, expect]) => {
  const result = finalPrices(...items);
  console.log(`结果：${result} ${result.toString() === expect.toString() ? '✅' : '❌'}`);
})
// @lc code=end

