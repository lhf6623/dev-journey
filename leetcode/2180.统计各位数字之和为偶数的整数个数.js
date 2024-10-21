/*
 * @lc app=leetcode.cn id=2180 lang=javascript
 *
 * [2180] 统计各位数字之和为偶数的整数个数
 */

// @lc code=start
/**
 * @param {number} num
 * @return {number}
 */
var countEven = function(num) {
  let sum = 0
  for(let i = 2; i <= num; i++) {
    let i_sum = 0, i_temp = i;
    while(i_temp > 0) {
      let lastNum = i_temp % 10
      i_sum += lastNum
      i_temp = (i_temp - lastNum) / 10
      
      if (i_temp < 10) {
        i_sum += i_temp
        break;
      }
    }
    if(i_sum % 2 === 0) {
      sum += 1
    }
    
  }

  return sum
};

// @lc code=end

