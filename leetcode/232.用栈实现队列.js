/*
 * @lc app=leetcode.cn id=232 lang=javascript
 *
 * [232] 用栈实现队列
 */

// @lc code=start

var MyQueue = function () {
  this.list = [];
};

/**
 * @param {number} x
 * @return {void}
 */
MyQueue.prototype.push = function (x) {
  this.list = [...this.list, x];
};

/**
 * @return {number}
 */
MyQueue.prototype.pop = function () {
  const [fast, ...arrt] = this.list;
  this.list = arrt;
  return fast;
};

/**
 * @return {number}
 */
MyQueue.prototype.peek = function () {
  return this.list[0];
};

/**
 * @return {boolean}
 */
MyQueue.prototype.empty = function () {
  return this.list.length === 0;
};

/**
 * Your MyQueue object will be instantiated and called as such:
 * var obj = new MyQueue()
 * obj.push(x)
 * var param_2 = obj.pop()
 * var param_3 = obj.peek()
 * var param_4 = obj.empty()
 */
// @lc code=end
