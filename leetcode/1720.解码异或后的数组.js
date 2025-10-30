/*
 * @lc app=leetcode.cn id=1720 lang=javascript
 *
 * [1720] 解码异或后的数组
 */

// @lc code=start
/**
 * @param {number[]} encoded
 * @param {number} first
 * @return {number[]}
 */
var decode = function (encoded, first) {
  let result = [first];
  for (let i = 0; i < encoded.length; i++) {
    result.push(result[i] ^ encoded[i]);
  }
  return result;
};
const test = [
  [[[1, 2, 3], 1], [1, 0, 2, 1]],
  [[[6, 2, 7, 3], 4], [4, 2, 0, 7, 4]],
].forEach(([items, expect]) => {
  const result = decode(...items);
  console.log(`结果：${result} ${result.toString() === expect.toString() ? '✅' : '❌'}`);
})
// @lc code=end

