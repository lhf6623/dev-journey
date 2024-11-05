/*
 * @lc app=leetcode.cn id=15 lang=javascript
 *
 * [15] 三数之和
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function (nums) {
  const _set = new Set(nums);
  if (_set.size === 1 && _set.has(0)) return [[0, 0, 0]];
  if (_set.size === 1) return [];

  const len = nums.length;
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    map.set(nums[i], i);
  }
  const res = [];
  for (let i = 0; i < len - 2; i++) {
    let num1 = nums[i];
    for (let j = i + 1; j < len - 1; j++) {
      let num2 = nums[j];
      let num3 = 0 - num1 - num2;
      const arr = [num1, num2, num3].sort();

      if (map.has(num3) && map.get(num3) > j && !map.has(arr.join("_"))) {
        res.push(arr);
        map.set(arr.join("_"), true);
      }
    }
  }

  return res;
};

const t = threeSum([-1, 0, 1, 2, -1, -4]);
console.log(`🚀 ~ t:`, t);

// @lc code=end
