/*
 * @lc app=leetcode.cn id=2 lang=javascript
 *
 * [2] 两数相加
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
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function (l1, l2) {
  let res_head = null, temp = null;
  let binary = 0;

  while (l1 || l2) {
    const val1 = l1?.val ?? 0;
    const val2 = l2?.val ?? 0;

    const sum = val1 + val2 + binary;
    binary = Math.floor(sum / 10);

    const node = new ListNode(sum % 10);

    if (!res_head) {
      res_head = node;
      temp = node;
    } else {
      temp.next = node;
      temp = node;
    }
    if (l1) l1 = l1.next;
    if (l2) l2 = l2.next;
  }

  if (binary) temp.next = new ListNode(binary);
  return res_head;
};
// @lc code=end

