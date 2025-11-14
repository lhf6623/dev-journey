/*
 * @lc app=leetcode.cn id=3477 lang=javascript
 *
 * [3477] 水果成篮 II
 */

// @lc code=start
/**
 * @param {number[]} fruits
 * @param {number[]} baskets
 * @return {number}
 */
var numOfUnplacedFruits = function (fruits, baskets) {
  for (let i = 0; i < fruits.length; i++) {
    for (let j = 0; j < baskets.length; j++) {
      if (fruits[i] <= baskets[j]) {
        baskets.splice(j, 1);
        break;
      }
    }
  }
  return baskets.length;
};
const test = [
  [[[4, 2, 5], [3, 5, 4]], 1],
  [[[3, 6, 1], [6, 4, 7]], 0],
].forEach(([items, expect]) => {
  const result = numOfUnplacedFruits(...items);
  console.log(`结果：${result} ${result.toString() === expect.toString() ? '✅' : '❌'}`);
})
// @lc code=end

