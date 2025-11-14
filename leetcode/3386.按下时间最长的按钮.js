/*
 * @lc app=leetcode.cn id=3386 lang=javascript
 *
 * [3386] 按下时间最长的按钮
 */

// @lc code=start
/**
 * @param {number[][]} events
 * @return {number}
 */
var buttonWithLongestTime = function (events) {
  let [minButton, maxTime] = events[0];
  for (let i = 1; i < events.length; i++) {
    const [button, time] = events[i];
    const diff = time - events[i - 1][1];

    if (diff > maxTime) {
      minButton = button;
      maxTime = diff;
    } else if (diff === maxTime) {
      minButton = Math.min(minButton, button);
    }
  }
  return minButton;
};
const test = [
  [[[[3, 2], [8, 6], [15, 7], [3, 11], [3, 12], [12, 14], [5, 15], [20, 16], [10, 17], [1, 20]]], 3],
  [[[[9, 4], [19, 5], [2, 8], [3, 11], [2, 15]]], 2],
  [[[[10, 4], [1, 6], [7, 14]]], 7],
  [[[[8, 4], [7, 6], [19, 9], [8, 14], [13, 15], [2, 16], [2, 18]]], 8],
  [[[[1, 2], [2, 5], [3, 9], [1, 15]]], 1],
  [[[[10, 5], [1, 7]]], 10],
].forEach(([items, expect]) => {
  const result = buttonWithLongestTime(...items);
  console.log(`结果：${result} ${result.toString() === expect.toString() ? '✅' : '❌'}`);
})
// @lc code=end

