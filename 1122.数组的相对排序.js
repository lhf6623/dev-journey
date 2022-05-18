/*
 * @lc app=leetcode.cn id=1122 lang=javascript
 *
 * [1122] 数组的相对排序
 */

// @lc code=start
/**
 * @param {number[]} arr1
 * @param {number[]} arr2
 * @return {number[]}
 */
var relativeSortArray = function (arr1, arr2) {
  let res_arr = [];
  arr2.forEach((item) => {
    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] == item) {
        res_arr.push(...arr1.splice(i, 1));
        i -= 1;
      }
    }
  });
  return [...res_arr, ...arr1.sort((a, b) => a - b)];
};

/* let arr = relativeSortArray(
  [2, 3, 1, 3, 2, 4, 6, 7, 9, 2, 19],
  [2, 1, 4, 3, 9, 6]
);
console.log(`🚀 ~ arr`, arr); */

// @lc code=end
