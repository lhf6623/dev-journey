/*
 * @lc app=leetcode.cn id=1640 lang=javascript
 *
 * [1640] 能否连接形成数组
 */

// @lc code=start
/**
 * @param {number[]} arr
 * @param {number[][]} pieces
 * @return {boolean}
 */
var canFormArray = function (arr, pieces) {
  let index = 0;
  for (let i = 0; i < arr.length; i++) {
    let piece = pieces[i];
    let pieceIndex = 0;
    if (Array.isArray(piece)) {
      for (let j = 0; j < piece.length; j++) {
        piece[j] == arr[i];
        console.log(`🚀 ~ piece[j] == arr[i]`, piece[j], arr[i + j]);
      }

      i += piece.length - 1;
    }
  }
  return true;
};

canFormArray([15, 88], [[88], [15]]);
// @lc code=end
