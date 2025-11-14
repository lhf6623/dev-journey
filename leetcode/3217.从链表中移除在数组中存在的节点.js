/*
 * @lc app=leetcode.cn id=3217 lang=javascript
 *
 * [3217] 从链表中移除在数组中存在的节点
 */

// @lc code=start
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {number[]} nums
 * @param {ListNode} head
 * @return {ListNode}
 */
var modifiedList = function (nums, head) {
  const obj = nums.reduce((acc, cur) => {
    acc[cur] = true;
    return acc;
  }, {});
  const _head = new ListNode(0, head);
  let cur = _head
  while (cur.next) {
    if (obj[cur.next.val]) {
      cur.next = cur.next.next;
    } else {
      cur = cur.next;
    }
  }
  return _head.next;
};
// @lc code=end

