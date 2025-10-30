/*
 * @lc app=leetcode.cn id=2678 lang=javascript
 *
 * [2678] 老人的数目
 */

// @lc code=start
/**
 * @param {string[]} details
 * @return {number}
 */
var countSeniors = function (details) {
  let ans = 0;
  for (const detail of details) {
    const age = `${detail[11]}${detail[12]}`
    if (parseInt(age) > 60) {
      ans++;
    }
  }
  return ans;
};
const test = [
  [[["9751302862F0693", "3888560693F7262", "5485983835F0649", "2580974299F6042", "9976672161M6561", "0234451011F8013", "4294552179O6482"]], 4],
  [[["5612624052M0130", "5378802576M6424", "5447619845F0171", "2941701174O9078"]], 2],
  [[["7868190130M7522", "5303914400F9211", "9273338290F4010"]], 2],
  [[["1313579440F2036", "2921522980M5644"]], 0],
].forEach(([items, expect]) => {
  const result = countSeniors(...items);
  console.log(`结果：${result} ${result.toString() === expect.toString() ? '✅' : '❌'}`);
})
// @lc code=end

