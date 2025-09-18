/*
 * @lc app=leetcode.cn id=599 lang=javascript
 *
 * [599] 两个列表的最小索引总和
 */

// @lc code=start
/**
 * @param {string[]} list1
 * @param {string[]} list2
 * @return {string[]}
 */
var findRestaurant = function (list1, list2) {
  let res = [];
  let min = 2000; // 长度最大为1000 两个就是两千
  for (let i = 0; i < list1.length; i++) {
    // 提前判断如果当前i已经超过最小和，后续无需再检查
    if (i > min) break;

    const item = list1[i];
    const index = list2.indexOf(item);
    if (index !== -1) {
      const sun = i + index;
      if (sun < min) {
        min = i + index;
        res.length = 0; // 清空数组比创建新数组更省内存
        res.push(item);
      } else if (sun === min) {
        res.push(item);
      }
    }
  }
  return res;
};

console.log(findRestaurant(["happy", "sad", "good"], ["sad", "happy", "good"]));
// @lc code=end
