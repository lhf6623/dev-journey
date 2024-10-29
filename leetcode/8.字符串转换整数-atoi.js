/*
 * @lc app=leetcode.cn id=8 lang=javascript
 *
 * [8] 字符串转换整数 (atoi)
 */

// @lc code=start
/**
 * @param {string} s
 * @return {number}
 */
var myAtoi = function (s) {
  // 不用内部函数 Number parseInt Math
  // s 由英文字母（大写和小写）、数字（0-9）、' '、'+'、'-' 和 '.' 组成
  let res = "";
  for (let i = 0; i < s.length; i++) {
    const item = s[i];
    const is_sign = item === "+" || item === "-";
    const is_space = item === " ";
    const is_as = res == "-" || res == "+";
    if (
      // 处理 a-z
      (item >= "a" && item <= "z") ||
      // A-Z
      (item >= "A" && item <= "Z") ||
      // . 位
      item === "." ||
      // 空格
      (res && is_space) ||
      // 处理 + -
      (res && is_sign)
    ) {
      break;
    }

    // 处理空格, 处理 0
    if ((!res && is_space) || (is_as && item == "0")) continue;
    if (is_as && is_space) return 0;

    // 处理 + -
    if (!res && is_sign) {
      res = item;
      continue;
    }

    if (item >= "0" && item <= "9") {
      res += item;
    }
  }

  if (res === "") return 0;
  if (res === "-" || res === "+") return 0;

  if (res < -(2 ** 31)) return -(2 ** 31);
  if (res > 2 ** 31 - 1) return 2 ** 31 - 1;
  return res | 0;
};

const m = myAtoi("-3.2");
console.log(`🚀 ~ m:`, m);

// @lc code=end
