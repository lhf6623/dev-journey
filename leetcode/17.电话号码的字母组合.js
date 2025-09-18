/*
 * @lc app=leetcode.cn id=17 lang=javascript
 *
 * [17] 电话号码的字母组合
 */

// @lc code=start
/**
 * @param {string} digits
 * @return {string[]}
 */
var letterCombinations = function (digits) {
  if (!digits) return [];
  let map = {
    2: "abc",
    3: "def",
    4: "ghi",
    5: "jkl",
    6: "mno",
    7: "pqrs",
    8: "tuv",
    9: "wxyz",
  };

  return digits.split("").reduce((pre, item) => {
    const cur = map[item].split("");
    if (!pre.length) {
      return (pre = cur);
    }
    // 第一种：O(N!) 2 ms 实现一个笛卡尔积
    // return pre.flatMap((prev) => cur.map((curItem) => prev + curItem));

    // 第二种：O(n**2) 1ms 这种方法提交时，偶尔登顶
    return digits
      .split("")
      .reduce((pre, item) => {
        const cur = map[item].split("");
        if (!pre.length) {
          return (pre = cur);
        }

        pre.map((pre_item) => {
          cur.map((cur_item) => {
            pre.push(pre_item + cur_item);
          });
        });

        return pre;
      }, [])
      .flatMap((item) => {
        return item.length === digits.length ? [item] : [];
      });
  }, []);
};

console.log(letterCombinations("239"));

// @lc code=end
