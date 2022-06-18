/*
 * @lc app=leetcode.cn id=846 lang=javascript
 *
 * [846] 一手顺子
 */

// @lc code=start
/**
 * @param {number[]} hand
 * @param {number} groupSize
 * @return {boolean}
 */
var isNStraightHand = function (hand, groupSize) {
  if (hand.length % groupSize) return false;
  if (groupSize == 1) return true;

  hand = hand.sort((a, b) => a - b);

  for (let i = 1; i < hand.length; i++) {
    if (i % groupSize === 0) {
      continue;
    }
    if (hand[i - 1] + 1 !== hand[i]) {
      const index = hand.lastIndexOf(hand[i - 1] + 1);

      if (index < i) return false;

      hand.splice(i, 0, ...hand.splice(index, 1));
    }
  }

  return true;
};
// @lc code=end
