/*
 * @lc app=leetcode.cn id=904 lang=javascript
 *
 * [904] 水果成篮
 */

// @lc code=start
/**
 * @param {number[]} fruits
 * @return {number}
 */
var totalFruit = function (fruits) {
  let ans = 0;
  let temp = [];
  const map = new Map();
  for (let i = 0; i < fruits.length; i++) {
    const item = fruits[i];
    if (map.size < 2 || map.has(item)) {
      map.set(item, true);
      temp.push(item);
    } else {
      ans = Math.max(ans, temp.length);
      let _item = temp.at(-1);

      for (let j = temp.length - 2; j >= 0; j--) {
        if (temp[j] !== _item) {
          map.delete(temp[j]);
          temp = temp.slice(j + 1);
          break;
        }
      }
      temp.push(item);
      map.set(item, true);

    }
  }
  return Math.max(ans, temp.length);
};
const test = [
  [[[0, 1, 1, 4, 3]], 3],
  [[[1, 0, 1, 4, 1, 4, 1, 2, 3]], 5],
  [[[1, 0, 3, 4, 3]], 3],
  [[[1, 2, 1]], 3],
  [[[0, 1, 2, 2]], 3],
  [[[1, 2, 3, 2, 2]], 4],
  [[[3, 3, 3, 1, 2, 1, 1, 2, 3, 3, 4]], 5],
].forEach(([items, expect]) => {
  const result = totalFruit(...items);
  console.log(`结果：${result} ${result.toString() === expect.toString() ? '✅' : '❌'}`);
})
// @lc code=end

