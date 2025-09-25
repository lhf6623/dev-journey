/*
 * @lc app=leetcode.cn id=2206 lang=javascript
 *
 * [2206] 将数组划分成相等数对
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {boolean}
 */
var divideArray = function (nums) {
  const set = new Set();
  nums.forEach((num) => {
    if (set.has(num)) {
      set.delete(num);
    } else {
      set.add(num);
    }
  });
  return set.size === 0;
  // const map = new Map();
  // for (const num of nums) {
  //   map.set(num, (map.get(num) || 0) + 1);
  // }
  // for (const [key, value] of map) {
  //   if (value % 2 !== 0) {
  //     return false;
  //   }
  // }
  // return true;
};

const test = [
  [[3, 2, 3, 2, 2, 2], true],
  [[1, 2, 3, 4], false],
];
test.forEach(([nums, expect]) => {
  const result = divideArray(nums);
  console.log(`测试用例: ${nums}: ${expect === result ? "通过" : "未通过"}`);
});
// @lc code=end
