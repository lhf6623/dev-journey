/*
 * @lc app=leetcode.cn id=1200 lang=javascript
 *
 * [1200] 最小绝对差
 */

// @lc code=start
/**
 * @param {number[]} arr
 * @return {number[][]}
 */
var minimumAbsDifference = function (arr) {
  arr = arr.sort((a, b) => a - b);
  let min = Number.MAX_VALUE;
  let arr_res = [];
  for (let i = 0; i < arr.length - 1; i++) {
    let _min = arr[i + 1] - arr[i];
    if (_min > min) continue;
    if (_min < min) {
      min = _min;
      arr_res = [[arr[i], arr[i + 1]]];
      continue;
    }
    arr_res.push([arr[i], arr[i + 1]]);
  }

  return arr_res;
};

//console.log(minimumAbsDifference([3, 8, -10, 23, 19, -4, -14, 27]));
// @lc code=end
