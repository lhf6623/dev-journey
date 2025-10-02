/*
 * @lc app=leetcode.cn id=1436 lang=javascript
 *
 * [1436] 旅行终点站
 */

// @lc code=start
/**
 * @param {string[][]} paths
 * @return {string}
 */
var destCity = function (paths) {
  const leftSet = new Set(paths.map((item) => item[0]));
  for (let i = 0; i < paths.length; i++) {
    const right = paths[i][1];
    if (!leftSet.has(right)) {
      return right;
    }
  }
};

const test = [
  [[["London", "New York"], ["New York", "Lima"], ["Lima", "Sao Paulo"]], "Sao Paulo"],
  [[["B", "C"], ["D", "B"], ["C", "A"]], "A"],
  [[["A", "Z"]], "Z"]
]

test.forEach(([paths, res]) => {
  const result = destCity(paths);
  console.log(result === res ? "测试成功" : "测试失败")
})
// @lc code=end

