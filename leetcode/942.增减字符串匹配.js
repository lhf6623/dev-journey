/*
 * @lc app=leetcode.cn id=942 lang=javascript
 *
 * [942] 增减字符串匹配
 */

// @lc code=start
/**
 * @param {string} s
 * @return {number[]}
 */

// 后面大于前面 I
// 后面小于前面 D

var diStringMatch = function (s) {
  let low = 0;
  let high = s.length;
  const result = [];

  for (let i = 0; i < s.length; i++) {
    if (s[i] === "I") {
      result.push(low++);
    } else {
      result.push(high--);
    }
  }

  result.push(low);

  return result;
};
console.log(diStringMatch("IDID"));

// @lc code=end
