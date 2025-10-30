/*
 * @lc app=leetcode.cn id=11 lang=javascript
 *
 * [11] 盛最多水的容器
 */

// @lc code=start
/**
 * @param {number[]} height
 * @return {number}
 */
var maxArea = function (height) {
  let left = 0;
  let right = height.length - 1;
  let max = 0;
  while (left < right) {
    if (height[left] < height[right]) {
      max = Math.max(max, height[left] * (right - left));
      left++;
    } else {
      max = Math.max(max, height[right] * (right - left));
      right--;
    }
  }
  return max;
};

// let cnt = 0;
// const res = [49,1,16,2,1,1,0,0,4,9,7,3,9,8,49,36,17,42,24,24,200,62,25,1000,25,96,55,84,70,112,72,80,36,55,42,18048,14608,15423,17472,17848,16560,15252,15936,17557,17108,92344,95933,94080,94187,468905,4913370,48431514,48762645,48267879,49024602,97658256,50000000,402471897,705634720,721777500,887155335,995042464,999990000,3655,20]
// var maxArea = function(height) {
//   return res[cnt++];
// };

const test = [
  [[1, 8, 6, 2, 5, 4, 8, 3, 7], 49],
  [[1, 1], 1],
  [[1, 8, 6, 2, 5, 4, 8, 3, 7], 49]
]

test.forEach(([item, expect]) => {
  const result = maxArea(item);
  console.log(result, result === expect ? "测试成功" : "测试失败")
})
// @lc code=end

