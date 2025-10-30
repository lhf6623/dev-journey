/*
 * @lc app=leetcode.cn id=1629 lang=javascript
 *
 * [1629] 按键持续时间最长的键
 */

// @lc code=start
/**
 * @param {number[]} releaseTimes
 * @param {string} keysPressed
 * @return {character}
 */
var slowestKey = function (releaseTimes, keysPressed) {
  let ans = keysPressed[0];
  let maxDuration = releaseTimes[0];
  for (let i = 1; i < releaseTimes.length; i++) {
    const duration = releaseTimes[i] - releaseTimes[i - 1];
    if (duration > maxDuration || (duration === maxDuration && keysPressed[i] > ans)) {
      ans = keysPressed[i];
      maxDuration = duration;
    }
  }
  return ans;
};
const test = [
  [[[9, 29, 49, 50], "cbcd"], 'c'],
  [[[12, 23, 36, 46, 62], "spuda"], 'a'],
].forEach(([items, expect]) => {
  const result = slowestKey(...items);
  console.log(`结果：${result} ${result.toString() === expect.toString() ? '✅' : '❌'}`);
})
// @lc code=end

