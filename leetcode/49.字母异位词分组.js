/*
 * @lc app=leetcode.cn id=49 lang=javascript
 *
 * [49] 字母异位词分组
 */

// @lc code=start
/**
 * @param {string[]} strs
 * @return {string[][]}
 */
var groupAnagrams = function (strs) {
  const obj = {};
  for (let i = 0; i < strs.length; i++) {
    const str = strs[i];
    const key = str.split("").sort().join("");
    if (obj[key]) {
      obj[key].push(str);
    } else {
      obj[key] = [str];
    }
  }
  return Object.values(obj);
};

const g = groupAnagrams(["eat", "tea", "tan", "ate", "nat", "bat"]);
console.log(`🚀 ~ g:`, g);

// @lc code=end
