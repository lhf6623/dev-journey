/*
 * @lc app=leetcode.cn id=1394 lang=javascript
 *
 * [1394] 找出数组中的幸运数
 */

// @lc code=start
/**
 * @param {number[]} arr
 * @return {number}
 */
var findLucky = function (arr) {
  arr.sort((a, b) => b - a);
  let lucky = [arr[0]];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] == lucky[0]) {
      lucky.push(arr[i]);
    } else {
      if (lucky.length == lucky[0]) {
        return lucky[0];
      }
      lucky = [arr[i]];
    }
  }

  if (lucky.length == lucky[0]) {
    return lucky[0];
  }

  return -1;
  // return (
  //   Object.entries(
  //     arr.reduce((acc, cur) => {
  //       if (acc[cur]) {
  //         acc[cur] += 1;
  //       } else {
  //         acc[cur] = 1;
  //       }
  //       return acc;
  //     }, {})
  //   )
  //     .flatMap(([key, value]) => (key == value ? [value] : []))
  //     .sort((a, b) => b - a)[0] || -1
  // );
};

console.log(findLucky([2, 2, 3, 3]));

// @lc code=end
