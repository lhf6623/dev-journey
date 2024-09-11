// 2624.蜗牛排序.js
/**
 * @param {number} rowsCount
 * @param {number} colsCount
 * @return {Array<Array<number>>}
 */
Array.prototype.snail = function (rowsCount, colsCount) {
  const arr = this;
  if (rowsCount * colsCount !== arr.length) return [];
  let direction = 1;
  let row = 0;
  let col = 0;
  const res_arr = [[arr[0]]]
  for (let i = 1; i < arr.length; i++) {
    if (i % rowsCount === 0) {
      direction *= -1;
      col += 1
    } else {
      row += direction;
    }
    if (res_arr[row]) {
      res_arr[row][col] = arr[i]
    } else {
      res_arr[row] = [arr[i]]
    }
  }
  return res_arr
}

/**
 * const arr = [1,2,3,4];
 * arr.snail(1,4); // [[1,2,3,4]]
 */
const arr = [19, 10, 3, 7, 9, 8, 5, 2, 1, 17, 16, 14, 12, 18, 6, 13, 11, 20, 4, 15];
console.time("snail");
const _snail = arr.snail(5, 4); // [[1,2,3,4]]
console.log(`🚀 ~ _snail:`, _snail);
console.timeEnd("snail");