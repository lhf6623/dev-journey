/*
 * @lc app=leetcode.cn id=1366 lang=javascript
 *
 * [1366] 通过投票对团队排名
 */

// @lc code=start
/**
 * @param {string[]} votes
 * @return {string}
 */
var rankTeams = function (votes) {
  const len = votes[0].length;
  const obj = votes[0].split("").reduce((acc, item) => {
    acc[item] = Array(len).fill(0);
    return acc;
  }, {});

  for (let i = 0; i < votes.length; i++) {
    const vote = votes[i];
    for (const key in obj) {
      const index = vote.indexOf(key);
      obj[key][index] += 1;
    }
  }

  function _run(arr, i = 0) {
    if (!arr.length) return "";
    if (i === len) {
      return arr
        .map(([key]) => key)
        .sort()
        .join("");
    }

    let l_arr = [];
    let r_arr = [];
    let max = arr.reduce((acc, item) => {
      return acc > item[1][i] ? acc : item[1][i];
    }, -Infinity);

    if (max === 0) return _run(arr, i + 1);

    // arr [[key, [1, 2, 3, 4]]]
    for (let j = 0; j < arr.length; j++) {
      const [key, _arr] = arr[j];
      if (_arr[i] == max) {
        l_arr.push([key, _arr]);
      } else {
        r_arr.push([key, _arr]);
      }
    }
    if (l_arr.length === 1 && r_arr.length == 1) {
      return l_arr[0][0] + r_arr[0][0];
    }
    if (l_arr.length === 1) return l_arr[0][0] + _run(r_arr, i);
    if (r_arr.length === 1) return _run(l_arr, i + 1) + r_arr[0][0];

    return _run(l_arr, i + 1) + _run(r_arr, i);
  }

  return _run(Object.entries(obj), 0);
};
const test6 = ["DABC", "ADCB", "ABDC", "ACBD", "ACDB"];
const test5 = [
  "FVSHJIEMNGYPTQOURLWCZKAX",
  "AITFQORCEHPVJMXGKSLNZWUY",
  "OTERVXFZUMHNIYSCQAWGPKJL",
  "VMSERIJYLZNWCPQTOKFUHAXG",
  "VNHOZWKQCEFYPSGLAMXJIUTR",
  "ANPHQIJMXCWOSKTYGULFVERZ",
  "RFYUXJEWCKQOMGATHZVILNSP",
  "SCPYUMQJTVEXKRNLIOWGHAFZ",
  "VIKTSJCEYQGLOMPZWAHFXURN",
  "SVJICLXKHQZTFWNPYRGMEUAO",
  "JRCTHYKIGSXPOZLUQAVNEWFM",
  "NGMSWJITREHFZVQCUKXYAPOL",
  "WUXJOQKGNSYLHEZAFIPMRCVT",
  "PKYQIOLXFCRGHZNAMJVUTWES",
  "FERSGNMJVZXWAYLIKCPUQHTO",
  "HPLRIUQMTSGYJVAXWNOCZEKF",
  "JUVWPTEGCOFYSKXNRMHQALIZ",
  "MWPIAZCNSLEYRTHFKQXUOVGJ",
  "EZXLUNFVCMORSIWKTYHJAQPG",
  "HRQNLTKJFIEGMCSXAZPYOVUW",
  "LOHXVYGWRIJMCPSQENUAKTZF",
  "XKUTWPRGHOAQFLVYMJSNEIZC",
  "WTCRQMVKPHOSLGAXZUEFYNJI",
];
const test1 = ["BCA", "CAB", "CBA", "ABC", "ACB", "BAC"];
const test2 = ["WXYZ", "XYZW"];
const m = rankTeams(test6);
console.log(m);

// @lc code=end
