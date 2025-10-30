/*
 * @lc app=leetcode.cn id=2363 lang=javascript
 *
 * [2363] 合并相似的物品
 */

// @lc code=start
/**
 * @param {number[][]} items1
 * @param {number[][]} items2
 * @return {number[][]}
 */
var mergeSimilarItems = function (items1, items2) {
  const map = new Map();
  for (const [value, weight] of items1) {
    map.set(value, (map.get(value) || 0) + weight);
  }
  for (const [value, weight] of items2) {
    map.set(value, (map.get(value) || 0) + weight);
  }
  return [...map].sort((a, b) => a[0] - b[0]);
};
const test = [
  [[[[1, 1], [4, 5], [3, 8]], [[3, 1], [1, 5]]], [[1, 6], [3, 9], [4, 5]]],
  [[[[1, 1], [3, 2], [2, 3]], [[2, 1], [3, 2], [1, 3]]], [[1, 4], [2, 4], [3, 4]]],
  [[[[1, 3], [2, 2]], [[7, 1], [2, 2], [1, 4]]], [[1, 7], [2, 4], [7, 1]]],
].forEach(([items, expect]) => {
  const result = mergeSimilarItems(...items);
  console.log(`结果：${result} ${result.toString() === expect.toString() ? '✅' : '❌'}`);
})
// @lc code=end

