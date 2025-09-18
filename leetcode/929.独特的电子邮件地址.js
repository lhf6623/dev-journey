/*
 * @lc app=leetcode.cn id=929 lang=javascript
 *
 * [929] 独特的电子邮件地址
 */

// @lc code=start
/**
 * @param {string[]} emails
 * @return {number}
 */
var numUniqueEmails = function (emails) {
  let set = new Set();
  for (let i = 0; i < emails.length; i++) {
    const item = emails[i];
    const index = item.indexOf("@");
    const local = item.substring(0, index);
    const domain = item.substring(index + 1);
    const new_local = local.replace(/\./g, "").replace(/\+.*/, "");
    set.add(new_local + "@" + domain);
  }
  return set.size;
};
console.log(
  numUniqueEmails([
    "test.email+alex@leetcode.com",
    "test.e.mail+bob.cathy@leetcode.com",
    "testemail+david@lee.tcode.com",
  ])
);

// @lc code=end
