/*
 * @lc app=leetcode.cn id=661 lang=javascript
 *
 * [661] 图片平滑器
 */

// @lc code=start
/**
 * @param {number[][]} img
 * @return {number[][]}
 */
var imageSmoother = function (img) {
  const res = [];
  for (let i = 0; i < img.length; i++) {
    const row = [];
    for (let j = 0; j < img[0].length; j++) {
      row.push(getAverage(img, i, j));
    }
    res.push(row);
  }
  return res;
};
// 获取周围元素的平均值
function getAverage(img, x, y) {
  const t = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 0],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ];
  let sum_arr = [];
  for (let i = 0; i < t.length; i++) {
    const [x1, y1] = t[i];
    const x2 = x + x1;
    const y2 = y + y1;
    if (x2 >= 0 && x2 < img.length && y2 >= 0 && y2 < img[0].length) {
      sum_arr.push(img[x2][y2]);
    }
  }

  const sum = sum_arr.reduce((a, b) => a + b, 0);
  return Math.floor((sum / sum_arr.length) | 0);
}
console.log(
  imageSmoother([
    [100, 200, 100],
    [200, 50, 200],
    [100, 200, 100],
  ])
);

// @lc code=end
