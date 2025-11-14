/*
 * @lc app=leetcode.cn id=1346 lang=javascript
 *
 * [1346] 检查整数及其两倍数是否存在
 */

// @lc code=start
/**
 * @param {number[]} arr
 * @return {boolean}
 */
var checkIfExist = function (arr) {
  // 方法二：Set
  const set = new Set();
  for (let i = 0; i < arr.length; i++) {
    const item = arr[i];
    if (set.has(item * 2) || set.has(item / 2)) return true;
    set.add(item);
  }
  return false;
  // 方法一：排序
  // const len = arr.length;
  // arr.sort((a, b) => b - a);

  // for (let i = 0; i < len; i++) {
  //   const minus = arr[i] < 0;
  //   for (let j = i + 1; j < len; j++) {
  //     if (minus !== arr[j] < 0) break;
  //     if (!minus) {
  //       if (arr[j] * 2 < arr[i]) break;
  //       if (arr[j] * 2 === arr[i]) return true;
  //     } else {
  //       if (arr[j] / 2 < arr[i]) break;
  //       if (arr[j] / 2 === arr[i]) return true;
  //     }
  //   }
  // }
  // return false;
};
const test = [
  [[[-766, 259, 203, 601, 896, -226, -844, 168, 126, -542, 159, -833, 950, -454, -253, 824, -395, 155, 94, 894, -766, -63, 836, -433, -780, 611, -907, 695, -395, -975, 256, 373, -971, -813, -154, -765, 691, 812, 617, -919, -616, -510, 608, 201, -138, -669, -764, -77, -658, 394, -506, -675, 523]], true],
  [[[-10, 12, -20, -8, 15]], true],
  [[[10, 2, 5, 3]], true],
  [[[7, 1, 14, 11]], true],
  [[[3, 1, 7, 11]], false]
].forEach(([items, expect]) => {
  const result = checkIfExist(...items);
  console.log(`结果：${result} ${result.toString() === expect.toString() ? '✅' : '❌'}`);
})
// @lc code=end

