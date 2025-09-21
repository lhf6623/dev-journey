/*
 * @lc app=leetcode.cn id=1046 lang=javascript
 *
 * [1046] 最后一块石头的重量
 */

// @lc code=start
/**
 * @param {number[]} stones
 * @return {number}
 */
var lastStoneWeight = function (stones) {
  while (stones.length) {
    stones.sort((a, b) => b - a);
    const [s1, s2, ..._stones] = stones;
    if (!s2) return s1;
    const s = s1 - s2;
    if (s) {
      stones = [..._stones, s];
    } else {
      stones = _stones;
    }

    if (stones.length === 1) {
      return stones[0];
    }
  }
  return 0;
};

console.log(lastStoneWeight([2, 7, 4, 1, 8, 1]));

// @lc code=end
