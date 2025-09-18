/*
 * @lc app=leetcode.cn id=748 lang=javascript
 *
 * [748] 最短补全词
 */

// @lc code=start
/**
 * @param {string} licensePlate
 * @param {string[]} words
 * @return {string}
 */
var shortestCompletingWord = function (licensePlate, words) {
  // 过滤掉非字母，忽略大小写
  const plate = licensePlate
    .replace(/[^a-zA-Z]/g, "")
    .toLowerCase()
    .split("");

  const plateMap = plate.reduce((acc, cur) => {
    acc[cur] = (acc[cur] || 0) + 1;
    return acc;
  }, {});

  words.sort((a, b) => a.length - b.length);
  for (let i = 0; i < words.length; i++) {
    const wordMap = words[i].split("").reduce((acc, cur) => {
      acc[cur] = (acc[cur] || 0) + 1;
      return acc;
    }, {});

    if (words[i].length < plate.length) continue;
    let num = 0;
    for (let key in plateMap) {
      if (!wordMap[key]) break;
      if (plateMap[key] > wordMap[key]) break;
      if (plateMap[key] <= wordMap[key]) {
        num += 1;
      }
    }
    if (num === Object.keys(plateMap).length) {
      return words[i];
    }
  }
};
console.log(
  shortestCompletingWord("1s3 PSt", ["step", "steps", "stripe", "stepple"])
);

// @lc code=end
