/*
 * @lc app=leetcode.cn id=917 lang=javascript
 *
 * [917] 仅仅反转字母
 */

// @lc code=start
/**
 * @param {string} s
 * @return {string}
 */
var reverseOnlyLetters = function (s) {
  const res = [];
  const temp = s.split('').flatMap(item => code.includes(item) ? [item] : [])
  for (let i = 0; i < s.length; i++) {
    if (code.includes(s[i])) {
      res.push(temp.pop())
    } else {
      res.push(s[i])
    }
  }
  return res.join('');
};
const code = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
  'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
const test = [
  [["ab-cd"], "dc-ba"],
  [["a-bC-dEf-ghIj"], "j-Ih-gfE-dCba"],
  [["Test1ng-Leet=code-Q!"], "Qedo1ct-eeLg=ntse-T!"],
].forEach(([items, expect]) => {
  const result = reverseOnlyLetters(...items);
  console.log(`结果：${result} ${result.toString() === expect.toString() ? '✅' : '❌'}`);
})
// @lc code=end

