/*
 * @lc app=leetcode.cn id=2231 lang=javascript
 *
 * [2231] 按奇偶性交换后的最大数字
 */

// @lc code=start
/**
 * @param {number} num
 * @return {number}
 */
var largestInteger = function (num) {
  // 奇数
  let odd_obj = {};
  // 偶数
  let even_obj = {};
  let numStr = `${num}`;
  let arr = Array(numStr.length).fill(0);

  numStr.split("").map((item, index) => {
    if (item % 2 === 0) {
      odd_obj[index] = item - 0;
    } else {
      even_obj[index] = item - 0;
    }
  });

  let odd_arr = Object.entries(odd_obj).sort((a, b) => {
    return b[1] - a[1];
  });
  let even_arr = Object.entries(even_obj).sort((a, b) => {
    return b[1] - a[1];
  });
  console.log(`🚀 ~ odd_arr`, even_arr);
};
largestInteger(1234);
// @lc code=end
