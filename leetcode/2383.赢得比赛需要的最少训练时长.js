/*
 * @lc app=leetcode.cn id=2383 lang=javascript
 *
 * [2383] 赢得比赛需要的最少训练时长
 */

// @lc code=start
/**
 * @param {number} initialEnergy
 * @param {number} initialExperience
 * @param {number[]} energy
 * @param {number[]} experience
 * @return {number}
 */
var minNumberOfHours = function (initialEnergy, initialExperience, energy, experience) {
  let ans = 0;
  let needEnergy = initialEnergy;
  let needExperience = initialExperience;
  for (let i = 0; i < energy.length; i++) {
    const en = needEnergy - energy[i];
    const ex = experience[i];

    if (en === 0) {
      needEnergy = 1;
      ans += needEnergy;
    } else if (en < 0) {
      needEnergy = 1;
      ans += Math.abs(en) + 1;
    } else {
      needEnergy = en;
    }

    if (needExperience === ex) {
      ans += 1;
      needExperience += ex + 1;
    } else if (needExperience < ex) {
      ans += (ex - needExperience) + 1;
      needExperience += ex + (ex - needExperience) + 1;
    } else {
      needExperience += ex;
    }

  }
  return ans;
};
const test = [
  [[1, 1, [1, 1, 1, 1], [1, 1, 1, 50]], 51],
  // [[5, 3, [1, 4, 3, 2], [2, 6, 3, 1]], 8],
  // [[2, 4, [1], [3]], 0],
].forEach(([items, expect]) => {
  const result = minNumberOfHours(...items);
  console.log(`结果：${result} ${result.toString() === expect.toString() ? '✅' : '❌'}`);
})
// @lc code=end

