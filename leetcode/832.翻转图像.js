/*
 * @lc app=leetcode.cn id=832 lang=javascript
 *
 * [832] 翻转图像
 */

// @lc code=start
/**
 * @param {number[][]} image
 * @return {number[][]}
 */
var flipAndInvertImage = function (image) {
  // return image.map((row) => {
  //   let len = row.length;
  //   for (let i = 0; i < len / 2; i++) {
  //     const temp = row[i];
  //     row[i] = row[len - 1 - i] ^ 1;
  //     row[len - 1 - i] = temp ^ 1;
  //   }
  //   return row;
  // });
  return image.map((row) => {
    return row.reverse().map((item) => {
      return item === 1 ? 0 : 1;
    });
  });
};

console.log(
  flipAndInvertImage([
    [1, 1, 0],
    [1, 0, 1],
    [0, 0, 0],
  ])
);

// @lc code=end
