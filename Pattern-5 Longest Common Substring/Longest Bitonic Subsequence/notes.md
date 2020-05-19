## Problem Statement

Given a number sequence, find the length of its Longest Bitonic Subsequence (LBS). A subsequence is considered bitonic if it is monotonically increasing and then monotonically decreasing.

Example 1:

```js
Input: {4,2,3,6,10,1,12}
Output: 5
Explanation: The LBS is {2,3,6,10,1}.
```

Example 2:

```js
Input: {4,2,5,9,7,6,10,3,1}
Output: 7
Explanation: The LBS is {4,5,9,7,6,3,1}.
```

## Basic Solution

A basic brute-force solution could be to try finding the Longest Decreasing Subsequences (LDS), starting from every number in both directions. So for every index 'i' in the given array, we will do two things:

1. Find LDS starting from 'i' to the end of the array
2. Find LDS starting from 'i' to the beginning of the array

LBS would be the maximum sum of the above two subsequences.

**Code:**

```js
const findLBSLength = (nums) => {
  let maxLength = 0;
  for (let i = 0; i < nums.length; i++) {
    const c1 = findLDSLength(nums, i, -1);
    const c2 = findLDSLengthRev(nums, i, -1);
    maxLength = Math.max(maxLength, c1 + c2 - 1);
  }
  return maxLength;
};

// find the longest decreasing subsequence from currentIndex till the end of the array
let findLDSLength = (nums, currentIndex, previousIndex) => {
  if (currentIndex === nums.length) return 0;

  // include nums[currentIndex] if it is smaller than the previous number
  let c1 = 0;
  if (previousIndex == -1 || nums[currentIndex] < nums[previousIndex]) {
    c1 = 1 + findLDSLength(nums, currentIndex + 1, currentIndex);
  }

  // excluding the number at currentIndex
  const c2 = findLDSLength(nums, currentIndex + 1, previousIndex);

  return Math.max(c1, c2);
};

// find the longest decreasing subsequence from currentIndex till the beginning of the array
const findLDSLengthRev = (nums, currentIndex, previousIndex) => {
  if (currentIndex < 0) return 0;

  // include nums[currentIndex] if it is smaller than the previous number
  let c1 = 0;
  if (previousIndex == -1 || nums[currentIndex] < nums[previousIndex]) {
    c1 = 1 + findLDSLengthRev(nums, currentIndex - 1, currentIndex);
  }

  // excluding the number at currentIndex
  const c2 = findLDSLengthRev(nums, currentIndex - 1, previousIndex);

  return Math.max(c1, c2);
};

console.log(`Length of Longest Bitonic Subsequence: ---> ${findLBSLength([4, 2, 3, 6, 10, 1, 12])}`);
console.log(`Length of Longest Bitonic Subsequence: ---> ${findLBSLength([4, 2, 5, 9, 7, 6, 10, 3, 1])}`);
```

The time complexity of the above algorithm is exponential O(2^n), where ‘n’ is the lengths of the input array. The space complexity is O(n) which is used to store the recursion stack.

## Top-Down Dynamic Programming with Memoization

To overcome the overlapping subproblems, we can use an array to store the already solved subproblems.

We need to memoize the recursive functions that calculate the longest decreasing subsequence. The two changing values for our recursive function are the current and the previous index. Therefore, we can store the results of all subproblems in a two-dimensional array.

**Code:**

```js
const findLBSLength = (nums) => {
  const lds = [];
  const ldsRev = [];

  // find the longest decreasing subsequence from currentIndex till the end of the array
  let findLDSLength = (nums, currentIndex, previousIndex) => {
    if (currentIndex === nums.length) return 0;

    lds[currentIndex] = lds[currentIndex] || [];
    if (previousIndex + 1 in lds[currentIndex]) return lds[currentIndex][previousIndex + 1];

    // include nums[currentIndex] if it is smaller than the previous number
    let c1 = 0;
    if (previousIndex == -1 || nums[currentIndex] < nums[previousIndex]) {
      c1 = 1 + findLDSLength(nums, currentIndex + 1, currentIndex);
    }

    // excluding the number at currentIndex
    const c2 = findLDSLength(nums, currentIndex + 1, previousIndex);

    lds[currentIndex][previousIndex + 1] = Math.max(c1, c2);
    return lds[currentIndex][previousIndex + 1];
  };

  // find the longest decreasing subsequence from currentIndex till the beginning of the array
  const findLDSLengthRev = (nums, currentIndex, previousIndex) => {
    if (currentIndex < 0) return 0;

    ldsRev[currentIndex] = ldsRev[currentIndex] || [];
    if (previousIndex + 1 in ldsRev[currentIndex]) return ldsRev[currentIndex][previousIndex + 1];

    // include nums[currentIndex] if it is smaller than the previous number
    let c1 = 0;
    if (previousIndex == -1 || nums[currentIndex] < nums[previousIndex]) {
      c1 = 1 + findLDSLengthRev(nums, currentIndex - 1, currentIndex);
    }

    // excluding the number at currentIndex
    const c2 = findLDSLengthRev(nums, currentIndex - 1, previousIndex);

    ldsRev[currentIndex][previousIndex + 1] = Math.max(c1, c2);
    return ldsRev[currentIndex][previousIndex + 1];
  };

  let maxLength = 0;
  for (let i = 0; i < nums.length; i++) {
    const c1 = findLDSLength(nums, i, -1);
    const c2 = findLDSLengthRev(nums, i, -1);
    maxLength = Math.max(maxLength, c1 + c2 - 1);
  }
  return maxLength;
};

console.log(`Length of Longest Bitonic Subsequence: ---> ${findLBSLength([4, 2, 3, 6, 10, 1, 12])}`);
console.log(`Length of Longest Bitonic Subsequence: ---> ${findLBSLength([4, 2, 5, 9, 7, 6, 10, 3, 1])}`);
```

## Bottom-up Dynamic Programming

The above algorithm shows us a clear bottom-up approach. We can separately calculate LDS for every index i.e., from the beginning to the end of the array and vice versa. The required length of LBS would be the one that has the maximum sum of LDS for a given index (from both ends).

```js
const findLBSLength = (nums) => {
  const lds = Array(nums.length).fill(0);
  const ldsReverse = Array(nums.length).fill(0);

  // find LDS for every index up to the beginning of the array
  for (let i = 0; i < nums.length; i++) {
    lds[i] = 1; // every element is an LDS of length 1
    for (let j = i - 1; j >= 0; j--)
      if (nums[j] < nums[i]) {
        lds[i] = Math.max(lds[i], lds[j] + 1);
      }
  }

  // find LDS for every index up to the end of the array
  for (let i = nums.length - 1; i >= 0; i--) {
    ldsReverse[i] = 1; // every element is an LDS of length 1
    for (let j = i + 1; j < nums.length; j++)
      if (nums[j] < nums[i]) {
        ldsReverse[i] = Math.max(ldsReverse[i], ldsReverse[j] + 1);
      }
  }

  let maxLength = 0;
  for (let i = 0; i < nums.length; i++) {
    maxLength = Math.max(maxLength, lds[i] + ldsReverse[i] - 1);
  }

  return maxLength;
};

console.log(`Length of Longest Bitonic Subsequence: ---> ${findLBSLength([4, 2, 3, 6, 10, 1, 12])}`);
console.log(`Length of Longest Bitonic Subsequence: ---> ${findLBSLength([4, 2, 5, 9, 7, 6, 10, 3, 1])}`);
```

The time complexity of the above algorithm is O(n^2) and the space complexity is O(n).
