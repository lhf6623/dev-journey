/*
 * @lc app=leetcode.cn id=989 lang=javascript
 *
 * [989] 数组形式的整数加法
 */

// @lc code=start
/**
 * @param {number[]} num
 * @param {number} k
 * @return {number[]}
 */
var addToArrayForm = function (num, k) {
  // return (BigInt(num.join("")) + BigInt(k)).toString().split("").map(Number);

  // 对齐长度
  const len = num.length - k.toString().length;
  if (len < 0) {
    num = [...Array(Math.abs(len)).fill(0), ...num];
  }
  k = k.toString();
  if (len > 0) {
    k = k.padStart(num.length, "0");
  }

  let i = num.length - 1;
  let temp = 0;
  while (i >= 0) {
    const sum = num[i] + Number(k[i]) + temp;
    temp = (sum / 10) | 0;
    num[i] = Math.floor(sum % 10);
    i--;
  }
  if (temp) {
    num.unshift(temp);
  }
  return num;
};

console.log(addToArrayForm([2, 1, 5], 806));

// @lc code=end
