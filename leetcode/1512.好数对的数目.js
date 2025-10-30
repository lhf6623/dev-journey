/*
 * @lc app=leetcode.cn id=1512 lang=javascript
 *
 * [1512] 好数对的数目
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var numIdenticalPairs = function (nums) {
  let ans = 0;
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] === nums[j]) {
        ans++;
      }
    }
  }
  return ans;
};
const test = [
  [[[1, 2, 3, 1, 1, 3]], 4],
  [[[1, 1, 1, 1]], 6],
  [[[1, 2, 3]], 0],
].forEach(([items, expect]) => {
  const result = numIdenticalPairs(...items);
  console.log(`结果：${result} ${result.toString() === expect.toString() ? '✅' : '❌'}`);
})
// @lc code=end

