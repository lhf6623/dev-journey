/*
 * @lc app=leetcode.cn id=13 lang=javascript
 *
 * [13] 罗马数字转整数
 */

// @lc code=start
/**
 * @param {string} s
 * @return {number}
 */
var romanToInt = function (s) {
  const map = {
    I: 1,
    IV: 4,
    V: 5,
    IX: 9,
    X: 10,
    XL: 40,
    L: 50,
    XC: 90,
    C: 100,
    CD: 400,
    D: 500,
    CM: 900,
    M: 1000,
  };
  let res = 0;

  for (let i = 0; i < s.length; i++) {
    const i1 = s[i];
    const i2 = s[i] + s[i + 1];
    if (map.hasOwnProperty(i2)) {
      res += map[i2];
      i++;
    } else {
      res += map[i1];
    }
  }
  return res;
};

const r = romanToInt("MCMXCIV");
console.log(`🚀 ~ r:`, r);

// @lc code=end
