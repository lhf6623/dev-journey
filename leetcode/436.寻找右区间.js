/*
 * @lc app=leetcode.cn id=436 lang=javascript
 *
 * [436] 寻找右区间
 */

// @lc code=start
/**
 * @param {number[][]} intervals
 * @return {number[]}
 */
var findRightInterval = function (intervals) {
  const map = new Map();
  for (let i = 0; i < intervals.length; i++) {
    map.set(intervals[i][0], i);
  }
  return intervals.map((interval) => {
    const index = map.get(interval[1]);
  });
};

const f = findRightInterval([
  [1, 4],
  [2, 3],
  [5, 7],
  [4, 5],
  [3, 4],
]);
console.log(`🚀 ~ f:`, f);
// @lc code=end
