/*
 * @lc app=leetcode.cn id=2078 lang=javascript
 *
 * [2078] 两栋颜色不同且距离最远的房子
 */

// @lc code=start
/**
 * @param {number[]} colors
 * @return {number}
 */
var maxDistance = function(colors) {
  let num = 0;
  const left = colors[0], right = colors.at(-1), LEN = colors.length - 1
  // 从左往右走
  for (let i = 0; i <= LEN; i++) {
    if(right !== colors[i]) {
      num = LEN - i
      break
    } 
  }

  // 从右往左走
  for(let i = LEN; i >=0; i--) {
    if(left !== colors[i]) {
      return num >= i ? num : i
    }
  }

  return 0
};
// @lc code=end

