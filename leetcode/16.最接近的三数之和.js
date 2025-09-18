/*
 * @lc app=leetcode.cn id=16 lang=javascript
 *
 * [16] 最接近的三数之和
 */

// @lc code=start

// 暴力破解法 验证
var _threeSumClosest = function (nums, target) {
  const res = [];
  for (let i = 0; i < nums.length; i++) {
    for (let j = 0; j < nums.length; j++) {
      if (i === j) continue;
      for (let k = 0; k < nums.length; k++) {
        if (i === k || j === k) continue;
        res.push([nums[i], nums[j], nums[k]]);
      }
    }
  }
  return res.reduce((pre, cur) => {
    let sum = cur.reduce((pre, cur) => pre + cur, 0);
    return Math.abs(sum - target) < Math.abs(pre - target) ? sum : pre;
  }, -Infinity);
};
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var threeSumClosest = function (nums, target) {
  nums.sort((a, b) => a - b);
  const n = nums.length;
  let min = Infinity;

  // 防止重复枚举，在 [i + 1, n] 的范围内枚举 b 和 c
  for (let i = 0; i < n; i++) {
    // 剪枝
    if (i > 0 && nums[i] === nums[i - 1]) continue;

    let j = i + 1;
    let k = n - 1;

    while (j < k) {
      const sum = nums[i] + nums[j] + nums[k];

      if (sum === target) return target;

      if (Math.abs(sum - target) < Math.abs(min - target)) {
        min = sum;
      }

      if (sum > target) {
        let k0 = k - 1;
        while (j < k0 && nums[k0] === nums[k]) {
          --k0;
        }
        k = k0;
      } else {
        let j0 = j + 1;
        while (j0 < k && nums[j0] === nums[j]) {
          ++j0;
        }
        j = j0;
      }
    }
  }
  return min;
};

console.log(
  threeSumClosest(
    [-84, 92, 26, 19, -7, 9, 42, -51, 8, 30, -100, -13, -38, 101],
    78
  ),
  _threeSumClosest(
    [-84, 92, 26, 19, -7, 9, 42, -51, 8, 30, -100, -13, -38, 101],
    78
  )
);

// @lc code=end
