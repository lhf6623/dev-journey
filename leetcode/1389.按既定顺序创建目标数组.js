/*
 * @lc app=leetcode.cn id=1389 lang=javascript
 *
 * [1389] 按既定顺序创建目标数组
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number[]} index
 * @return {number[]}
 */
var createTargetArray = function (nums, index) {
  let res = [];
  for (let i = 0; i < nums.length; i++) {
    const _index = index[i];
    const put_arr = [nums[i]];
    const res_n = res[_index];
    if (res_n !== undefined) {
      put_arr.push(res_n);
    } else {
      res[_index] = nums[i];
      continue; // 有这个跳过，耗时0ms
    }
    res[_index] = put_arr;
    res = res.flat(2);
  }
  return res;

  // const res = [];
  // for (let i = 0; i < nums.length; i++) {
  //   res.splice(index[i], 0, nums[i]);
  // }
  // return res;
};

console.log(createTargetArray([0, 1, 2, 3, 4], [0, 1, 2, 2, 1]));

// @lc code=end
