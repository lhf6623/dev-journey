/*
 * @lc app=leetcode.cn id=3541 lang=javascript
 *
 * [3541] 找到频率最高的元音和辅音
 */

// @lc code=start
/**
 * @param {string} s
 * @return {number}
 */
var maxFreqSum = function (s) {
  const vowels = new Map([
    ["a", 0],
    ["e", 0],
    ["i", 0],
    ["o", 0],
    ["u", 0],
  ]);
  let v = 0;
  const consonant = new Map()
  let c = 0;
  for (let i = 0; i < s.length; i++) {
    const item = s[i];
    if (vowels.has(item)) {
      const num = vowels.get(item) + 1;
      vowels.set(item, num)
      v = Math.max(v, num);
    } else {
      const num = (consonant.get(item) || 0) + 1;
      consonant.set(item, num)
      c = Math.max(c, num);
    }
  }
  return v + c;
};
const test = [
  [["successes"], 6],
  [["aeiaeia"], 3],
].forEach(([items, expect]) => {
  const result = maxFreqSum(...items);
  console.log(`结果：${result} ${result.toString() === expect.toString() ? '✅' : '❌'}`);
})
// @lc code=end

