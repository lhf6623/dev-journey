/*
 * @lc app=leetcode.cn id=2241 lang=javascript
 *
 * [2241] 设计一个 ATM 机器
 */

// @lc code=start

var ATM = function () {
  this.moneys = [20, 50, 100, 200, 500];
  this.banknotesCount = [0, 0, 0, 0, 0];
};

/**
 * @param {number[]} banknotesCount
 * @return {void}
 */
ATM.prototype.deposit = function (banknotesCount) {
  for (let i = 0; i < banknotesCount.length; i++) {
    this.banknotesCount[i] += banknotesCount[i];
  }
};

/**
 * @param {number} amount
 * @return {number[]}
 */
ATM.prototype.withdraw = function (amount) {
  const res = [0, 0, 0, 0, 0];
  let rest = amount;
  for (let i = this.moneys.length - 1; i >= 0; i--) {
    const money = this.moneys[i];
    const count = Math.min(this.banknotesCount[i], Math.floor(rest / money));
    res[i] = count;
    rest -= count * money;
  }
  if (rest !== 0) {
    return [-1];
  }
  for (let i = 0; i < this.banknotesCount.length; i++) {
    this.banknotesCount[i] -= res[i];
  }
  return res;
};

/**
 * Your ATM object will be instantiated and called as such:
 * var obj = new ATM()
 * obj.deposit(banknotesCount)
 * var param_2 = obj.withdraw(amount)
 */
var obj = new ATM();
obj.deposit([0, 0, 1, 2, 1]);
var param_2 = obj.withdraw(600);
console.log(`🚀 ~ param_2:`, param_2);
obj.deposit([0, 1, 0, 1, 1]);
var param_3 = obj.withdraw(600);
console.log(`🚀 ~ param_2:`, param_3);
var param_4 = obj.withdraw(550);
console.log(`🚀 ~ param_2:`, param_4);

// @lc code=end
