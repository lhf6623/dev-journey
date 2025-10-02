/*
 * @lc app=leetcode.cn id=2085 lang=javascript
 *
 * [2085] 统计出现过一次的公共字符串
 */

// @lc code=start
/**
 * @param {string[]} words1
 * @param {string[]} words2
 * @return {number}
 */
var countWords = function (words1, words2) {
  const map1 = new Map()
  for (let i = 0; i < words1.length; i++) {
    const word = words1[i]
    map1.set(word, (map1.get(word) || 0) + 1)
  }

  const map2 = new Map()
  for (let i = 0; i < words2.length; i++) {
    const word = words2[i]
    map2.set(word, (map2.get(word) || 0) + 1)
  }
  let count = 0
  for (const [key, value] of map1) {
    if (value === 1 && map2.get(key) === 1) {
      count++
    }
  }

  return count
};

const test = [
  [[["leetcode", "is", "amazing", "as", "is"], ["amazing", "leetcode", "is"]], 2],
  [[["b", "bb", "bbb"], ["a", "aa", "aaa"]], 0],
  [[["a", "ab"], ["a", "a", "a", "ab"]], 1],
]
test.forEach(([args, expect]) => {
  const res = countWords(...args)
  console.log(`测试用例: ${JSON.stringify(args)}: 预期: ${expect} 结果: ${res} ${res === expect ? "通过" : "未通过"}`)
})
// @lc code=end

