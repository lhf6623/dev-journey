/*
 * @lc app=leetcode.cn id=3479 lang=javascript
 *
 * [3479] 水果成篮 III
 */

// @lc code=start
/**
 * @param {number[]} fruits
 * @param {number[]} baskets
 * @return {number}
 */
var numOfUnplacedFruits = function (fruits, baskets) {
  const n = baskets.length;
  const m = Math.floor(Math.sqrt(n));
  const section = Math.ceil(n / m);
  let count = 0;
  const maxV = new Array(section).fill(0);

  for (let i = 0; i < n; i++) {
    const sec = Math.floor(i / m);
    maxV[sec] = Math.max(maxV[sec], baskets[i]);
  }

  for (const fruit of fruits) {
    let unset = 1;
    for (let sec = 0; sec < section; sec++) {
      if (maxV[sec] < fruit) {
        continue;
      }
      let choose = 0;
      maxV[sec] = 0;
      for (let i = 0; i < m; i++) {
        const pos = sec * m + i;
        if (pos < n && baskets[pos] >= fruit && !choose) {
          baskets[pos] = 0;
          choose = 1;
        }
        if (pos < n) {
          maxV[sec] = Math.max(maxV[sec], baskets[pos]);
        }
      }
      unset = 0;
      break;
    }
    count += unset;
  }
  return count;
}

const test = [
  [[[4, 2, 5], [3, 5, 4]], 1],
  [[[3, 6, 1], [6, 4, 7]], 0],
].forEach(([items, expect]) => {
  const result = numOfUnplacedFruits(...items);
  console.log(`结果：${result} ${result.toString() === expect.toString() ? '✅' : '❌'}`);
})
// @lc code=end

