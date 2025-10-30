/*
 * @lc app=leetcode.cn id=1488 lang=javascript
 *
 * [1488] 避免洪水泛滥
 */

// @lc code=start
/**
 * @param {number[]} rains
 * @return {number[]}
 */
var avoidFlood = function (rains) {
  let n = rains.length

  let ans = Array(n).fill(-1)

  let lakeRainDayDict = {}//记录每个湖下次下雨的时间

  let noRainDays = []//记录不会下雨的日子，可以抽水

  for (let i = 0; i < n; i++) {

    if (rains[i] === 0) {

      //不会下雨的日子

      noRainDays.push(i)

    } else {

      //会下雨的日子

      if (lakeRainDayDict[rains[i]] !== undefined) {//不是第一次下雨，已经满水了

        let j = 0

        //现在的lakeRainDayDict[rains[i]]的值是rains[i]这个湖的上一次下雨时间，当前的i是rains[i]这个湖的下一次下雨时间，得在不下雨的日子中找到一天来把水抽掉，抽水的这天必须介于上一次下雨日和下一次下雨日之间

        for (j; j < noRainDays.length; j++) {

          if ((noRainDays[j] > lakeRainDayDict[rains[i]]) && noRainDays[j] < i) break

        }

        if (j >= noRainDays.length) return []//没有合适的抽水日，这个湖必洪水

        let day = noRainDays.splice(j, 1)[0]//这天用来抽水，用过了就从noRainDays数组里去掉

        ans[day] = rains[i]

      }

      lakeRainDayDict[rains[i]] = i//记录下雨日子
    }
  }
  noRainDays.forEach(day => ans[day] = 1)//要是有多余的没下雨的日子，就都设定为抽第一个湖的水，反正选择抽干一个空的湖泊将无事发生。

  return ans
};

const test = [
  [[1, 2, 3, 4], [-1, -1, -1, -1]],
  [[1, 2, 0, 0, 2, 1], [-1, -1, 2, 1, -1, -1]],
  [[1, 2, 0, 1, 2], []]
]
test.forEach(([item, expect]) => {
  const result = avoidFlood(item);

  console.log(`输入：${JSON.stringify(item)}`);
  console.log(`预期：${JSON.stringify(expect)}`);
  console.log(`结果：${JSON.stringify(result)}`);
  console.log(`${result.toString() === expect.toString() ? '✅ 通过' : '❌ 未通过'}`);
  console.log('========');
})
// @lc code=end

