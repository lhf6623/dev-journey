// 2649.嵌套数组生成器.js

/**
 * @param {Array} arr
 * @return {Generator}
 */
var inorderTraversal = function* (arr) {
  for (let i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i])) {
      yield* inorderTraversal(arr[i])
      continue;
    }
    yield arr[i];
  }
};

/**
 * const gen = inorderTraversal([1, [2, 3]]);
 * gen.next().value; // 1
 * gen.next().value; // 2
 * gen.next().value; // 3
 */

const gen = inorderTraversal([1, [2, 3]]);
console.log(`🚀 ~ gen.next().value:`, gen.next().value);
console.log(`🚀 ~ gen.next().value:`, gen.next().value);
console.log(`🚀 ~ gen.next().value:`, gen.next().value);
