/*
 * @lc app=leetcode.cn id=914 lang=javascript
 *
 * [914] 卡牌分组
 */

// @lc code=start
/**
 * @param {number[]} deck
 * @return {boolean}
 */
var hasGroupsSizeX = function (deck) {
  if (deck.length < 2) return false;
  const map = new Map();
  for (let i = 0; i < deck.length; i++) {
    map.set(deck[i], (map.get(deck[i]) || 0) + 1);
  }
  const arr = [...map.values()];
  const _gcd = gcdMultiple(arr)
  const min = _gcd < 2 ? Math.min(...arr) : _gcd;
  if (min === 1) return false;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] % min !== 0) return false
  }
  return true;
};
function gcdMultiple(numbers) {
  return numbers.reduce((acc, curr) => gcd(acc, curr), numbers[0]);
}

function gcd(a, b) {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b !== 0) {
    const remainder = a % b;
    a = b;
    b = remainder;
  }
  return a;
}
const test = [
  [[[0, 0, 0, 0, 0, 1, 1, 2, 3, 4]], false],
  [[[1, 1, 1, 1, 2, 2, 2, 2, 2, 2]], true],
  [[[1, 2, 3, 4, 4, 3, 2, 1]], true],
  [[[1, 1, 1, 2, 2, 2, 3, 3]], false],
].forEach(([items, expect]) => {
  const result = hasGroupsSizeX(...items);
  console.log(`结果：${result} ${result.toString() === expect.toString() ? '✅' : '❌'}`);
})
// @lc code=end

