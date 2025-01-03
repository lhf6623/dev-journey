/*
 * @lc app=leetcode.cn id=729 lang=javascript
 *
 * [729] 我的日程安排表 I
 */

// @lc code=start

var MyCalendar = function () {
  this.list = [];
};

/**
 * @param {number} startTime
 * @param {number} endTime
 * @return {boolean}
 */
MyCalendar.prototype.book = function (startTime, endTime) {
  let len = this.list.length;
  if (len === 0) {
    this.list = [[startTime, endTime]];
    return true;
  }
  if (len === 1) {
    const [first, last] = this.list[0];
    if (startTime >= last) {
      this.list.push([startTime, endTime]);
      return true;
    }
    if (endTime < first) {
      this.list.unshift([startTime, endTime]);
      return true;
    }
    return false;
  }

  for (let i = 0; i < len - 1; i++) {
    const [first, last] = this.list[i];
    const next = this.list[i + 1];

    // 最开始
    if (endTime <= first && i == 0) {
      this.list.unshift([startTime, endTime]);
      return true;
    }
    // 最后
    if (startTime >= next[1] && i == len - 2) {
      this.list.push([startTime, endTime]);
      return true;
    }
    // 如果有下一个，对比当前和下一个
    if (startTime >= last && endTime <= next[0]) {
      this.list.splice(i + 1, 0, [startTime, endTime]);
      return true;
    }
  }

  return false;
};

/**
 * Your MyCalendar object will be instantiated and called as such:
 * var obj = new MyCalendar()
 * var param_1 = obj.book(startTime,endTime)
 */
var obj = new MyCalendar();
const arr1 = [
  [47, 50],
  [33, 41],
  [39, 45],
  [33, 42],
  [25, 32],
  [26, 35],
  [19, 25],
  [3, 8],
  [8, 13],
  [18, 27],
];
const arr2 = [
  [20, 32],
  [1, 19],
  [34, 47],
  [30, 48],
  [26, 44],
];
for (let i = 0; i < arr2.length; i++) {
  const [startTime, endTime] = arr2[i];
  var param_1 = obj.book(startTime, endTime);
  console.log(param_1);
}
// @lc code=end
