/*
 * @lc app=leetcode.cn id=2418 lang=javascript
 *
 * [2418] 按身高排序
 */

// @lc code=start
/**
 * @param {string[]} names
 * @param {number[]} heights
 * @return {string[]}
 */
var sortPeople = function (names, heights) {
  const obj = heights.reduce((acc, cur, i) => {
    acc[cur] = i;
    return acc;
  }, {})
  heights.sort((a, b) => b - a);
  return heights.map((height) => names[obj[height]]);


  // return names.map((name, index) => ({ name, height: heights[index] })).sort((a, b) => b.height - a.height).map(item => item.name)
};
const test = [
  [[["Mary", "John", "Emma"], [180, 165, 170]], ["Mary", "Emma", "John"]],
  [[["Alice", "Bob", "Bob"], [155, 185, 150]], ["Bob", "Alice", "Bob"]],
].forEach(([items, expect]) => {
  const result = sortPeople(...items);
  console.log(`结果：${result} ${result.toString() === expect.toString() ? '✅' : '❌'}`);
})
// @lc code=end

