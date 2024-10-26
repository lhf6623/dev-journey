/*
 * @lc app=leetcode.cn id=6 lang=javascript
 *
 * [6] Z 字形变换
 */

// @lc code=start
/**
 * @param {string} s
 * @param {number} numRows
 * @return {string}
 */
var convert = function (s, numRows) {
  if (numRows === 1) return s;
  let top = 0;
  let left = 0;
  let direction = 1; // 1 下 -1 上

  // 为了更直观的理解，用二维数组模拟
  const _map = [];
  for (let i = 0; i < numRows; i++) {
    _map.push([]);
  }

  for (let i = 0; i < s.length; i++) {
    _map[top][left] = s[i];
    top += direction;

    if (direction < 0) {
      left += 1;
    }

    if (top == numRows - 1 || top == 0) {
      direction = direction === 1 ? -1 : 1;
    }
  }

  return _map.reduce((pre, curr) => {
    return `${pre}${curr.join("")}`;
  }, "");
};

const c = convert("PAYPALISHIRING", 3);
console.log(`🚀 ~ c:`, c);
// PAHNAPLSIIGYIR
// @lc code=end
