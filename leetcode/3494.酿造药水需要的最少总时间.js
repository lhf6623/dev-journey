/*
 * @lc app=leetcode.cn id=3494 lang=javascript
 *
 * [3494] 酿造药水需要的最少总时间
 */

// @lc code=start
/**
 * @param {number[]} skill
 * @param {number[]} mana
 * @return {number}
 */
var minTime = function (skill, mana) {
  const n = skill.length, m = mana.length;
  const times = new Array(n).fill(0);

  for (let j = 0; j < m; j++) {
    let curTime = 0;
    for (let i = 0; i < n; i++) {
      curTime = Math.max(curTime, times[i]) + skill[i] * mana[j];
    }
    times[n - 1] = curTime;
    for (let i = n - 2; i >= 0; i--) {
      times[i] = times[i + 1] - skill[i + 1] * mana[j];
    }
  }
  return times[n - 1];
};

const test = [
  [[[1, 5, 2, 4], [5, 1, 4, 2]], 110],
  [[[1, 1, 1], [1, 1, 1]], 5],
  [[[1, 2, 3, 4], [1, 2]], 21]
]

test.forEach(([items, expect]) => {
  const result = minTime(...items);
  console.log(`结果：${result} ${result === expect ? '✅' : '❌'}`);
})
// @lc code=end

