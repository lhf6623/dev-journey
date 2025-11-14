/*
 * @lc app=leetcode.cn id=3318 lang=javascript
 *
 * [3318] 计算子数组的 x-sum I
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} k
 * @param {number} x
 * @return {number[]}
 */
var findXSum = function (nums, k, x) {
  let ans = [];
  const map = new Map();

  for (let i = 0; i < k; i++) {
    const item = nums[i];
    map.set(item, (map.get(item) || 0) + 1);
  }
  ans.push(compare(map, x));

  let i = 1;
  while (i <= nums.length - k) {
    const first = nums[i - 1];
    const last = nums[i + k - 1]
    map.set(first, map.get(first) - 1);
    map.set(last, (map.get(last) || 0) + 1);
    const count = compare(map, x);
    ans.push(count);
    i++
  }

  return ans;
};

function compare(map, x) {
  const group_arr = [...map].sort((a, b) => {
    if (a[1] !== b[1]) {
      return b[1] - a[1];
    } else {
      return b[0] - a[0];
    }
  });

  let count = 0;
  for (let j = 0; j < group_arr.length; j++) {
    if (j >= x) return count;
    const [value, coun] = group_arr[j];
    count += value * coun;
  }
  return count;
}

const test = [
  [[[1, 1, 2, 2, 3, 4, 2, 3], 6, 2], [6, 10, 12]],
  [[[9, 2, 2], 3, 3], [13]],
  [[[5, 5, 4, 3, 1, 3, 1, 3, 4, 6, 4, 2], 10, 2], [19, 21, 21]],
  [[[1, 6, 1, 3, 3, 5, 6, 2, 5], 7, 2], [18, 18, 16]],
  [[[50, 50, 50, 50, 50, 50], 6, 1], [300]],
  [[[1, 1, 2, 2, 3, 4, 2, 3], 6, 2], [6, 10, 12]],
  [[[3, 8, 7, 8, 7, 5], 2, 2], [11, 15, 15, 15, 12]],
].forEach(([items, expect]) => {
  console.time("执行耗时");
  const result = findXSum(...items);
  console.log(`结果：${result} ${result.toString() === expect.toString() ? '✅' : '❌'}`);
  console.timeEnd("执行耗时");
})
// @lc code=end

