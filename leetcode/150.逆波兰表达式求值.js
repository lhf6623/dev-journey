/*
 * @lc app=leetcode.cn id=150 lang=javascript
 *
 * [150] 逆波兰表达式求值
 */

// @lc code=start
/**
 * @param {string[]} tokens
 * @return {number}
 */
var evalRPN = function (tokens) {
  const stack = [];
  for (const token of tokens) {
    if (token === "+") {
      stack.push(stack.pop() + stack.pop());
    } else if (token === "-") {
      stack.push(-stack.pop() + stack.pop());
    } else if (token === "*") {
      stack.push(stack.pop() * stack.pop());
    } else if (token === "/") {
      const a = stack.pop();
      stack.push(Math.trunc(stack.pop() / a));
    }
    else {
      stack.push(parseInt(token));
    }
  }
  return stack.pop();
};
const test = [
  [[["2", "1", "+", "3", "*"]], 9],
  [[["4", "13", "5", "/", "+"]], 6],
  [[["10", "6", "9", "3", "+", "-11", "*", "/", "*", "17", "+", "5", "+"]], 22]
].forEach(([items, expect]) => {
  const result = evalRPN(...items);
  console.log(`结果：${result} ${result.toString() === expect.toString() ? '✅' : '❌'}`);
})
// @lc code=end

