/*
 * @lc app=leetcode.cn id=824 lang=javascript
 *
 * [824] 山羊拉丁文
 */

// @lc code=start
/**
 * @param {string} sentence
 * @return {string}
 */
var toGoatLatin = function (sentence) {
  const vowel = new Set(['a', 'e', 'i', 'o', 'u', 'A', 'E', 'I', 'O', 'U']);
  let str = ''
  return sentence.split(' ').map((word, index) => {
    const [f, ...rest] = word.split('')

    const vowelIndex = vowel.has(f) ? `${word}ma` : `${rest.join('')}${f}ma`;
    return `${vowelIndex}${str += 'a'}`;
  }).join(' ');
};
const test = [
  [["I speak Goat Latin"], 'Imaa peaksmaaa oatGmaaaa atinLmaaaaa'],
  [["The quick brown fox jumped over the lazy dog"], "heTmaa uickqmaaa rownbmaaaa oxfmaaaaa umpedjmaaaaaa overmaaaaaaa hetmaaaaaaaa azylmaaaaaaaaa ogdmaaaaaaaaaa"],
].forEach(([items, expect]) => {
  const result = toGoatLatin(...items);
  console.log(`结果：${result} ${result.toString() === expect.toString() ? '✅' : '❌'}`);
})
// @lc code=end

