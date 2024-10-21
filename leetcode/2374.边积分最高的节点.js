/*
 * @lc app=leetcode.cn id=2374 lang=javascript
 *
 * [2374] 边积分最高的节点
 */

// @lc code=start
/**
 * @param {number[]} edges
 * @return {number}
 */
var edgeScore = function (edges) {
  let obj = {}
  let max = 0
  // 计数
  for (let i = 0; i < edges.length; i++) {
    const item = (obj[edges[i]] ?? 0) + i
    obj[edges[i]] = item
    max = Math.max(item, max);
  }
  return Object.entries(obj).reduce((pre, [k, v]) => {
    return v === max ? Math.min(k, pre) : pre
  }, Infinity)
};
// @lc code=end

