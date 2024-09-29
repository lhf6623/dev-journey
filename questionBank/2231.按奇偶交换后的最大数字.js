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
  let odd_arr = [];
  // 偶数
  let even_arr = [];
  let arr = `${num}`.split("").map((n) => n - 0);

  arr.map((item) => {
    let arr = item % 2 === 0 ? odd_arr : even_arr;
    arr.push(item);
  });
  // 偶数
  odd_arr.sort((a, b) => {
    return a - b;
  });
  // 奇数
  even_arr.sort((a, b) => {
    return a - b;
  });
  return arr
    .map((item) => {
      return item % 2 === 0 ? odd_arr.pop() : even_arr.pop();
    })
    .join("");
};

/* let arr = largestInteger(1234);
console.log(`🚀 ~ arr`, arr); */

// @lc code=end
