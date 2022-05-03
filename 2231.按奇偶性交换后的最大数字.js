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

  `${num}`.split("").map((item, index) => {
    if (item % 2 === 0) {
      odd_obj[index] = item;
    } else {
      even_obj[index] = item;
    }
  });

  console.log(odd_obj, even_obj);
};
largestInteger(1234);
// @lc code=end
