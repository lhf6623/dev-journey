/*
 * @lc app=leetcode.cn id=1331 lang=javascript
 *
 * [1331] 数组序号转换
 */

// @lc code=start
/**
 * @param {number[]} arr
 * @return {number[]}
 */
var arrayRankTransform = function (arr) {
  const _arr = [...arr];
  _arr.sort((a, b) => a - b);

  const map = new Map();

  for (const item of _arr) {
    if (!map.has(item)) {
      map.set(item, map.size + 1);
    }
  }
  return arr.map((item) => map.get(item));
};

console.log(arrayRankTransform([37, 12, 28, 9, 100, 56, 80, 5, 12]));

// @lc code=end
