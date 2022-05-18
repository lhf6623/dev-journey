/*
 * @lc app=leetcode.cn id=976 lang=javascript
 *
 * [976] 三角形的最大周长
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var largestPerimeter = function (nums) {
  /* let [n1, n2, n3, ..._nums] = nums.sort((a, b) => b - a);
  if (n2 + n3 <= n1) {
    if (nums.length === 3) return 0;
    return largestPerimeter([n2, n3, ..._nums]);
  }
  return n1 + n2 + n3; */

  let _nums = nums.sort((a, b) => b - a);
  while (_nums.length >= 3) {
    let [n1, n2, n3] = _nums;
    if (n1 >= n2 + n3 && _nums.length === 3) return 0;
    if (n1 < n2 + n3) return n1 + n2 + n3;
    _nums.shift();
  }
  return 0;
};

/* let arr = largestPerimeter([4, 1, 2]);
console.log(`🚀 ~ arr`, arr); */

// @lc code=end
