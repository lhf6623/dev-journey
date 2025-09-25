/*
 * @lc app=leetcode.cn id=1528 lang=javascript
 *
 * [1528] 重新排列字符串
 */

// @lc code=start
/**
 * @param {string} s
 * @param {number[]} indices
 * @return {string}
 */
var restoreString = function (s, indices) {
  const len = s.length;
  const res = new Array(len);
  for (let i = 0; i < len; i++) {
    res[indices[i]] = s[i];
  }
  return res.join("");

  // return s
  //   .split("")
  //   .map((_, i) => s[indices.indexOf(i)])
  //   .join("");
};

const test = [
  ["codeleet", [4, 5, 6, 7, 0, 2, 1, 3], "leetcode"],
  ["abc", [0, 1, 2], "abc"],
];

test.forEach(([s, indices, expect]) => {
  const result = restoreString(s, indices);
  console.log(
    `测试用例: ${s}, ${indices}: ${expect === result ? "通过" : "未通过"}`
  );
});
// @lc code=end
