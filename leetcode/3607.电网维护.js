/*
 * @lc app=leetcode.cn id=3607 lang=javascript
 *
 * [3607] 电网维护
 */

// @lc code=start
/**
 * @param {number} c
 * @param {number[][]} connections
 * @param {number[][]} queries
 * @return {number[]}
 */
class DSU {
  constructor(size) {
    this.size = size;
    this.parent = Array.from({ length: size }).map((_, i) => i);
  }

  join(u, v) {
    this.parent[this.find(v)] = this.find(u);
  }

  find(x) {
    return this.parent[x] === x ? x : (this.parent[x] = this.find(this.parent[x]));
  }
}

var processQueries = function (c, connections, queries) {
  const dsu = new DSU(c + 1);

  connections.forEach(([u, v]) => {
    dsu.join(u, v);
  });

  const online = Array.from({ length: c + 1 }).fill(true);
  const offlineCounts = Array.from({ length: c + 1 }).fill(0);
  const minimumOnlineStations = new Map();

  for (const [op, x] of queries) {
    if (op === 2) {
      online[x] = false;
      offlineCounts[x] += 1;
    }
  }

  for (let i = 1; i <= c; i++) {
    const root = dsu.find(i);
    if (!minimumOnlineStations.has(root)) {
      minimumOnlineStations.set(root, -1);
    }

    const station = minimumOnlineStations.get(root);
    if (online[i] === true) {
      if (station === -1 || station > i) {
        minimumOnlineStations.set(root, i);
      }
    }
  }

  const ans = [];

  for (const [op, x] of queries.reverse()) {
    const root = dsu.find(x);
    const station = minimumOnlineStations.get(root);

    if (op === 1) {
      if (online[x]) {
        ans.push(x);
      } else {
        ans.push(station);
      }
    }

    if (op === 2) {
      if (offlineCounts[x] > 1) {
        offlineCounts[x] -= 1;
      } else {
        online[x] = true;
        if (station === -1 || station > x) {
          minimumOnlineStations.set(root, x);
        }
      }
    }
  }

  return ans.reverse();
};
const test = [
  [[5, [[1, 2], [2, 3], [3, 4], [4, 5]], [[1, 3], [2, 1], [1, 1], [2, 2], [1, 2]]], [3, 2, 3]],
  [[3, [], [[1, 1], [2, 1], [1, 1]]], [1, -1]],
].forEach(([items, expect]) => {
  const result = processQueries(...items);
  console.log(`结果：${result} ${result.toString() === expect.toString() ? '✅' : '❌'}`);
})
// @lc code=end

