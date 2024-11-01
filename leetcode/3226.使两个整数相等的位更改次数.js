/*
 * @lc app=leetcode.cn id=3226 lang=javascript
 *
 * [3226] 使两个整数相等的位更改次数
 */

// @lc code=start
/**
 * @param {number} n
 * @param {number} k
 * @return {number}
 */
var minChanges = function (n, k) {
  if (n === k) return 0;
  if (n < k) return -1;
  const n_bin = n.toString(2);
  const k_bin = k.toString(2).padStart(n_bin.length, "0");
  let res = 0;
  for (let i = 0; i < k_bin.length; i++) {
    if (k_bin[i] !== n_bin[i]) {
      if (n_bin[i] === "0") return -1;
      res += 1;
    }
  }

  return res;
};

const m = minChanges(14, 13);
console.log(`🚀 ~ m:`, m);

// @lc code=end
