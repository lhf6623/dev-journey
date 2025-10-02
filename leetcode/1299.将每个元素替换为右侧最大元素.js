/*
 * @lc app=leetcode.cn id=1299 lang=javascript
 *
 * [1299] 将每个元素替换为右侧最大元素
 */

// @lc code=start
/**
 * @param {number[]} arr
 * @return {number[]}
 */
var replaceElements = function (arr) {

  // 从右往左
  let max = -1;
  for (let i = arr.length - 1; i >= 0; i--) {
    const _max = Math.max(max, arr[i]);
    arr[i] = max;
    max = _max;
  }
  return arr;

  // 从左往右
  // let index = -1;
  // let max = -1;
  // for (let i = 0; i < arr.length; i++) {
  //   if (i >= index) {
  //     max = -1;
  //     for (let j = i + 1; j < arr.length; j++) {
  //       if (arr[j] > max) {
  //         max = arr[j];
  //         index = j;
  //       }
  //     }
  //   }
  //   arr[i] = max;
  // }
  // return arr
};
const test = [
  [[17, 18, 5, 4, 6, 1], [18, 6, 6, 6, 1, -1]],
  [[400], [-1]],
]
test.forEach(([args, expect]) => {
  const res = replaceElements(args)
  const resStr = res.sort((a, b) => a - b).toString();
  const argsStr = args.sort((a, b) => a - b).toString();
  const expectStr = expect.sort((a, b) => a - b).toString();
  console.log(`测试用例: ${argsStr}: 预期: ${expectStr} 结果: ${resStr} ${resStr === expectStr ? "通过" : "未通过"}`)
})
// @lc code=end

