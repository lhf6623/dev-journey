/*
 * @lc app=leetcode.cn id=12 lang=javascript
 *
 * [12] 整数转罗马数字
 */

// @lc code=start
/**
 * @param {number} num
 * @return {string}
 */
var intToRoman = function (num) {
  const map = [
    [1, "I"],
    [4, "IV"],
    [5, "V"],
    [9, "IX"],
    [10, "X"],
    [40, "XL"],
    [50, "L"],
    [90, "XC"],
    [100, "C"],
    [400, "CD"],
    [500, "D"],
    [900, "CM"],
    [1000, "M"],
  ];
  let res = "";
  let temp = num.toString().split("");
  while (temp.length) {
    let item = temp.shift();
    if (item === "0") {
      continue;
    }
    let f = item * Math.pow(10, temp.length);

    while (f > 0) {
      let key = "";
      let value = 0;
      for (let i = map.length - 1; i >= 0; i--) {
        const [_value, _key] = map[i];
        if (f >= _value) {
          key = _key;
          value = _value;
          break;
        }
      }

      f -= value;
      res += key;
    }
  }

  return res;
};

const i = intToRoman(3999);
console.log(`🚀 ~ i:`, i);

// @lc code=end
