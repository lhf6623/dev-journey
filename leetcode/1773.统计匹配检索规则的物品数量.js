/*
 * @lc app=leetcode.cn id=1773 lang=javascript
 *
 * [1773] 统计匹配检索规则的物品数量
 */

// @lc code=start
/**
 * @param {string[][]} items
 * @param {string} ruleKey
 * @param {string} ruleValue
 * @return {number}
 */
var countMatches = function (items, ruleKey, ruleValue) {
  const map = {
    type: 0,
    color: 1,
    name: 2,
  };
  return items.filter((item) => item[map[ruleKey]] === ruleValue).length;
};
// @lc code=end
