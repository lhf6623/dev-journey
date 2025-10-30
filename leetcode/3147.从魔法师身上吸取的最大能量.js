/*
 * @lc app=leetcode.cn id=3147 lang=javascript
 *
 * [3147] 从魔法师身上吸取的最大能量
 */

// @lc code=start
/**
 * @param {number[]} energy
 * @param {number} k
 * @return {number}
 */
var maximumEnergy = function (energy, k) {
  let ans = -1001;
  const len = energy.length;;
  for (let i = 0; i < k; i++) {
    if (len - i < 0) break;

    let curIndex = len - i - 1;
    let sun = 0;
    while (curIndex >= 0) {
      sun += energy[curIndex];
      ans = Math.max(ans, sun);
      curIndex -= k;
    }
  }
  return ans;
};
const test = [
  [[[5, 2, -10, -5, 1], 3], 3],
  [[[-2, -3, -1], 2], -1],
]

test.forEach(([items, expect]) => {
  const result = maximumEnergy(...items);
  console.log(`结果：${result} ${result === expect ? '✅' : '❌'}`);
})
// @lc code=end

