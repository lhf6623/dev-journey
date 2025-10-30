/*
 * @lc app=leetcode.cn id=2404 lang=javascript
 *
 * [2404] 出现最频繁的偶数元素
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var mostFrequentEven = function (nums) {
  let map = new Map();
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] % 2 === 0) {
      map.set(nums[i], (map.get(nums[i]) || 0) + 1);
    }
  }
  const arr = Array.from(map.entries()).sort((a, b) => {
    if (a[1] !== b[1]) {
      return b[1] - a[1];
    }
    return a[0] - b[0];
  });

  return arr.length ? arr[0][0] : -1;
};
const test = [
  [[[0, 1, 2, 2, 4, 4, 1]], 2],
  [[[4, 4, 4, 9, 2, 4]], 4],
  [[[29, 47, 21, 41, 13, 37, 25, 7]], -1],
].forEach(([items, expect]) => {
  const result = mostFrequentEven(...items);
  console.log(`结果：${result} ${result.toString() === expect.toString() ? '✅' : '❌'}`);
})
// @lc code=end

