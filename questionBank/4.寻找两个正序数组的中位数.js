/*
 * @lc app=leetcode.cn id=4 lang=javascript
 *
 * [4] 寻找两个正序数组的中位数
 */

// @lc code=start

/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var findMedianSortedArrays = function (nums1, nums2) {
	/**
    let c = nums1.concat(nums2).sort((a, b)=>{
      return a - b
    });
    if(c.length%2==0){
      return (c[(c.length)/2-1] + c[Math.ceil((c.length)/2)])/2
    }else {
      return c[Math.floor((c.length)/2)]
    }
   */
	const LEN = nums1.length + nums2.length;
	const isOdd = LEN % 2 === 1;
	const middle = isOdd ? Math.floor(LEN / 2) : LEN / 2 - 1;

	if (LEN <= 2) {
		let arr = [...nums1, ...nums2];
		if (LEN === 1) return arr[0];
		return (arr[0] + arr[1]) / 2;
	}
	let l1i = 0;
	let l2i = 0;
	let l1 = null;
	let l2 = null;

	for (let i = 0; i <= middle; i++) {
		let _l1 = nums1[l1i];
		let _l2 = nums2[l2i];
		if (_l1 === undefined) {
			l2 = nums2[l2i++];
			continue;
		}
		if (_l2 === undefined) {
			l1 = nums1[l1i++];
			continue;
		}

		if (_l1 > _l2) {
			l2 = nums2[l2i++];
		} else if (_l1 < _l2) {
			l1 = nums1[l1i++];
		} else {
			l1 = nums1[l1i++];
			l2 = nums2[l2i++];
			i++;
		}
	}

	const _l1 = Math.max(l1 ?? -Infinity, l2 ?? -Infinity);

	if (isOdd) {
		return _l1;
	} else {
		const _l2 = Math.min(nums1[l1i] ?? Infinity, nums2[l2i] ?? Infinity);
		return (_l1 + _l2) / 2;
	}
};

const m = findMedianSortedArrays(
	[1, 4, 5, 12, 16, 19, 21, 25, 27],
	[93, 101, 181, 283, 344, 411, 432, 489, 511, 554, 556]
);
console.log(m);

// @lc code=end
