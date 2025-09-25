/*
 * @lc app=leetcode.cn id=228 lang=javascript
 *
 * [228] 汇总区间
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {string[]}
 */
var summaryRanges = function (nums) {
  let s = nums[0];
  return nums.flatMap((num, i) => {
    if (nums[i + 1] - num !== 1) {
      let res = s == num ? [num.toString()] : [`${s}->${num}`];
      s = nums[i + 1];
      return res;
    }
    return [];
  });
  // let res = [];
  // for (let i = 0; i < nums.length; i++) {
  //   let start = i;
  //   while (i < nums.length - 1 && nums[i] + 1 === nums[i + 1]) {
  //     i++;
  //   }
  //   if (start === i) {
  //     res.push(nums[start].toString());
  //   } else {
  //     res.push(nums[start] + "->" + nums[i]);
  //   }
  // }
  // return res;
};

console.log(summaryRanges([0, 1, 2, 4, 5, 7]));

// @lc code=end
