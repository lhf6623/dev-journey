/*
 * @lc app=leetcode.cn id=6041 lang=javascript
 *
 * [6041] 多个数组求交集
 */

// @lc code=start
/**
 * @param {number[][]} nums
 * @return {number[]}
 */
var intersection = function(nums) {
  // 暴力解题
  let obj = {}
  nums[0].map(item => {
    obj[item] = 1
  })
  for(let i = 1; i < nums.length; i++) {
    for(let j = 0; j < nums[i].length; j++) {
      if(obj[nums[i][j]]) {
        obj[nums[i][j]] += 1
      }
    }
  }
  return Object.entries(obj).flatMap(([k, v]) => {
    if(v === nums.length) return [k]
    return []
  })
};

console.log(intersection([[3,1,2,4,5],[1,2,3,4],[3,4,5,6]]))

// @lc code=end

