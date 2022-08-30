/*
 * @lc app=leetcode.cn id=1678 lang=javascript
 *
 * [1678] 设计 Goal 解析器
 */

// @lc code=start
/**
 * @param {string} command
 * @return {string}
 */
var interpret = function (command) {
  // return command.replace(/\(al\)/g, "al").replace(/\(\)/g, "o");
  let _interpret = "";
  let i = command.length - 1,
    tmp = "";
  while (i >= 0) {
    tmp += command[i];

    if (tmp[0] == ")") {
      if (tmp == ")(") {
        tmp = "";
        _interpret = `o${_interpret}`;
      }
      if (tmp == ")la(") {
        tmp = "";
        _interpret = `al${_interpret}`;
      }
    } else {
      _interpret = `${tmp}${_interpret}`;

      tmp = "";
    }
    i--;
  }

  return _interpret;
};

/* let j = interpret("(al)G(al)()()G");
console.log(`🚀 ~ j`, j); */
// @lc code=end
