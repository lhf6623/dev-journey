/*
 * @lc app=leetcode.cn id=2300 lang=javascript
 *
 * [2300] 咒语和药水的成功对数
 */

// @lc code=start
/**
 * @param {number[]} spells
 * @param {number[]} potions
 * @param {number} success
 * @return {number[]}
 */
var successfulPairs = function (spells, potions, success) {

  // 方法二 160 ms
  const spells_sort = [...new Set(spells)].sort((a, b) => a - b);
  potions.sort((a, b) => a - b);

  const map = new Map();
  const len = potions.length - 1;
  let left = len;
  for (let i = 0; i < spells_sort.length; i++) {
    while (spells_sort[i] * potions[left] >= success && left >= 0) {
      left--;
    }
    map.set(spells_sort[i], len - left);
  }
  return spells.map(item => map.get(item));


  // 方法一 2483 ms
  // const res = [];
  // const len = potions.length;
  // potions.sort((a, b) => a - b);

  // for (let i = 0; i < spells.length; i++) {
  //   const spell = spells[i];
  //   for (let j = 0; j < len; j++) {
  //     if (spell * potions[j] >= success) {
  //       res.push(len - j);
  //       break;
  //     }
  //     if (spell * potions[len - j - 1] < success) {
  //       res.push(j);
  //       break;
  //     }
  //   }
  // }
  // return res;
};

const test = [
  [[[16, 13, 7, 36, 16, 25, 22, 18, 29], [38, 25], 223], [2, 2, 1, 2, 2, 2, 2, 2, 2]],
  [[[1, 2, 3, 4, 5, 6, 7], [1, 2, 3, 4, 5, 6, 7], 25], [0, 0, 0, 1, 3, 3, 4]],
  [[[15, 8, 19], [38, 36, 23], 328], [3, 0, 3]],
  [[[5, 1, 3], [1, 2, 3, 4, 5], 7], [4, 0, 3]],
  [[[3, 1, 2], [8, 5, 8], 16], [2, 0, 2]]
]
test.forEach(([item, expect]) => {
  const result = successfulPairs(...item);
  console.log(`输出：${JSON.stringify(result)}`);
  console.log(`预期：${JSON.stringify(expect)}`);

  console.log(`${result.toString() === expect.toString() ? '✅' : '❌'}`);
})
// @lc code=end

