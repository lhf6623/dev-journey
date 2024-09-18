/*
 * @lc app=leetcode.cn id=1184 lang=javascript
 *
 * [1184] 公交站间的距离
 */

// @lc code=start
/**
 * @param {number[]} distance
 * @param {number} start
 * @param {number} destination
 * @return {number}
 */
var distanceBetweenBusStops = function (distance, start, destination) {
  if (start > destination) {
    [start, destination] = [destination, start]
  }
  let sum1 = 0, sum2 = 0;
  for (let i = 0; i < distance.length; i++) {
    if (i >= start && i < destination) {
      sum1 += distance[i];
    } else {
      sum2 += distance[i];
    }
  }
  return Math.min(sum1, sum2);
};
const a = distanceBetweenBusStops([1, 2, 3, 4], 0, 2)
console.log(a);

// @lc code=end

