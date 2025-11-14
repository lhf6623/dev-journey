/*
 * @lc app=leetcode.cn id=412 lang=javascript
 *
 * [412] Fizz Buzz
 */

// @lc code=start
/**
 * @param {number} n
 * @return {string[]}
 */
var fizzBuzz = function (n) {
  let res = [];
  for (let i = 1; i <= n; i++) {
    let str = "";
    if (i % 3 === 0) str += "Fizz";
    if (i % 5 === 0) str += "Buzz";
    res.push(str || i.toString());
  }
  return res;
};
const test = [
  [[3], ["1", "2", "Fizz"]],
  [[5], ["1", "2", "Fizz", "4", "Buzz"]],
  [[15], ["1", "2", "Fizz", "4", "Buzz", "Fizz", "7", "8", "Fizz", "Buzz", "11", "Fizz", "13", "14", "FizzBuzz"]]
].forEach(([items, expect]) => {
  const result = fizzBuzz(...items);
  console.log(`结果：${result} ${result.toString() === expect.toString() ? '✅' : '❌'}`);
})
// @lc code=end

