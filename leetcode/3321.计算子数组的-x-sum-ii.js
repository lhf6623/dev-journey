/*
 * @lc app=leetcode.cn id=3321 lang=javascript
 *
 * [3321] 计算子数组的 x-sum II
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} k
 * @param {number} x
 * @return {number[]}
 */
var findXSum = function (nums, k, x) {
  // TODO: 没通过，findIndex 和 splice x 较大时，耗时严重，需要找个更好的数据结构
  let ans = [];
  const map = new Map();

  // 初始化数据
  for (let i = 0; i < k; i++) {
    const item = nums[i];
    map.set(item, (map.get(item) || 0) + 1);
  }
  let init_arr = [...map].sort((a, b) => {
    if (a[1] !== b[1]) {
      return b[1] - a[1];
    } else {
      return b[0] - a[0];
    }
  });

  ans.push(getCount(init_arr, x));

  let i = 1;
  while (i <= nums.length - k) {
    const first = nums[i - 1];
    const last = nums[i + k - 1];
    del(init_arr, first);
    add(init_arr, last)

    ans.push(getCount(init_arr, x));
    i++
  }

  return ans;
};

function getCount(arr, x) {
  let count = 0;
  for (let j = 0; j < arr.length; j++) {
    if (j >= x) return count;
    const [value, coun] = arr[j];
    count += value * coun;
  }
  return count;
}

function add(arr, newvalue) {
  const index = arr.findIndex(item => item[0] === newvalue);
  const new_arr = [newvalue, (arr[index]?.[1] ?? 0) + 1];

  if (index !== -1) {
    arr.splice(index, 1);
  }
  const max_index = getIndex(arr, new_arr)
  arr.splice(max_index, 0, new_arr);
}

function del(arr, delvalue) {
  const index = arr.findIndex(item => item[0] === delvalue);
  const [value, i] = arr[index];
  const new_i = i - 1;

  arr.splice(index, 1);

  if (new_i > 0) {
    const max_index = getIndex(arr, [value, new_i])
    arr.splice(max_index, 0, [value, new_i]);
  }
}

// 获取插入下标
function getIndex(arr, newvalue) {
  const [value, i] = newvalue;
  let flag = false;
  const index = arr.findIndex(item => {
    if (i > item[1]) return true;
    if (value > item[0] && item[1] === i) return true;
    if (item[1] === i && !flag) {
      flag = true;
    } else if (item[1] != i && flag) {
      return true;
    }
  });
  return index === -1 ? arr.length : index;
}

const test = [
  [[[2, 5, 3, 5, 1], 2, 1], [5, 5, 5, 5]],
  [[[1, 1, 2, 2, 3, 4, 2, 3], 6, 2], [6, 10, 12]],
  [[[3, 8, 7, 8, 7, 5], 2, 2], [11, 15, 15, 15, 12]],
  [[[8]], 0]
].forEach(([items, expect]) => {
  console.time("执行耗时");
  const result = findXSum(...items);
  console.log(`结果：${result} ${result.toString() === expect.toString() ? '✅' : '❌'}`);
  console.timeEnd("执行耗时");
})
// @lc code=end

