/*
 * @lc app=leetcode.cn id=2185 lang=javascript
 *
 * [2185] 统计包含给定前缀的字符串
 */

// @lc code=start
/**
 * @param {string[]} words
 * @param {string} pref
 * @return {number}
 */
var prefixCount = function (words, pref) {
  return words.filter(item => item.startsWith(pref)).length;
};

const test = [
  [[["pay", "attention", "practice", "attend"], 'at'], 2],
  [[["leetcode", "win", "loops", "success"], 'code'], 0]
]

test.forEach(([args, expect]) => {
  const res = prefixCount(...args)
  console.log(`测试用例: ${JSON.stringify(args)}: 预期: ${expect} 结果: ${res} ${res === expect ? "通过" : "未通过"}`)
})
// @lc code=end

