## Problem Statement

Given two strings ‘s1’ and ‘s2’, find the length of the longest subsequence which is common in both the strings.

A subsequence is a sequence that can be derived from another sequence by deleting some or no elements without changing the order of the remaining elements.

Example 1:

```js
Input: s1 = "abdca"
       s2 = "cbda"
Output: 3
Explanation: The longest common subsequence is "bda".
```

Example 2:

```js
Input: s1 = "passport"
       s2 = "ppsspt"
Output: 5
Explanation: The longest common subsequence is "psspt".
```

## Basic Solution

A basic brute-force solution could be to try all subsequences of ‘s1’ and ‘s2’ to find the longest one. We can match both the strings one character at a time. So for every index ‘i’ in ‘s1’ and ‘j’ in ‘s2’ we must choose between:

1. If the character s1[i] matches s2[j], we can recursively match for the remaining lengths.
2. If the character s1[i] does not match s2[j], we will start two new recursive calls by skipping one character separately from each string.

**Code:**

```js
const findLCSLength = function (s1, s2) {
  function findLCSLengthHelper(s1, s2, i1, i2) {
    if (i1 === s1.length || i2 === s2.length) return 0;

    if (s1[i1] === s2[i2]) return 1 + findLCSLengthHelper(s1, s2, i1 + 1, i2 + 1);

    let c1 = findLCSLengthHelper(s1, s2, i1, i2 + 1);
    let c2 = findLCSLengthHelper(s1, s2, i1 + 1, i2);

    return Math.max(c1, c2);
  }

  return findLCSLengthHelper(s1, s2, 0, 0);
};

console.log(`Length of Longest Common Subsequence: ---> ${findLCSLength('abdca', 'cbda')}`);
console.log(`Length of Longest Common Subsequence: ---> ${findLCSLength('passport', 'ppsspt')}`);
```

The time complexity of the above algorithm is exponential O(2^{m+n}), where ‘m’ and ‘n’ are the lengths of the two input strings. The space complexity is O(n+m) which is used to store the recursion stack.

## Top-down Dynamic Programming with Memoization

We can use an array to store the already solved subproblems.

The two changing values to our recursive function are the two indexes, i1 and i2. Therefore, we can store the results of all the subproblems in a two-dimensional array.

**Code:**

```js
const findLCSLength = function (s1, s2) {
  const dp = [];
  function findLCSLengthHelper(s1, s2, i1, i2) {
    if (i1 == s1.length || i2 == s2.length) return 0;

    dp[i1] = dp[i1] || [];
    if (typeof dp[i1][i2] === 'undefined') {
      if (s1[i1] === s2[i2]) dp[i1][i2] = 1 + findLCSLengthHelper(s1, s2, i1 + 1, i2 + 1);
      else {
        let c1 = findLCSLengthHelper(s1, s2, i1, i2 + 1);
        let c2 = findLCSLengthHelper(s1, s2, i1 + 1, i2);
        dp[i1][i2] = Math.max(c1, c2);
      }
    }

    return dp[i1][i2];
  }
  return findLCSLengthHelper(s1, s2, 0, 0);
};

console.log(`Length of Longest Common Subsequence: ---> ${findLCSLength('abdca', 'cbda')}`);
console.log(`Length of Longest Common Subsequence: ---> ${findLCSLength('passport', 'ppsspt')}`);
```

## Bottom-up Dynamic Programming

Since we want to match all the subsequences of the given two strings, we can use a two-dimensional array to store our results. The lengths of the two strings will define the size of the array’s two dimensions. So for every index ‘i’ in string ‘s1’ and ‘j’ in string ‘s2’, we will choose one of the following two options:

1. If the character s1[i] matches s2[j], the length of the common subsequence would be one plus the length of the common subsequence till the i-1 and j-1 indexes in the two respective strings.
2. If the character s1[i] does not match s2[j], we will take the longest subsequence by either skipping ith or jth character from the respective strings.

So, our recursive formula will be:

```js
if s1[i] == s2[j]
  dp[i][j] = 1 + dp[i-1][j-1]
else
  dp[i][j] = max(dp[i-1][j], dp[i][j-1])
```

**Code:**

```js
const findLCSLength = function (s1, s2) {
  const dp = Array(s1.length + 1)
    .fill(0)
    .map(() => Array(s2.length + 1).fill(0));

  let maxLength = 0;
  for (let i = 1; i <= s1.length; i++) {
    for (let j = 1; j <= s2.length; j++) {
      if (s1[i - 1] === s2[j - 1]) {
        dp[i][j] = 1 + dp[i - 1][j - 1];
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }

      maxLength = Math.max(maxLength, dp[i][j]);
    }
  }
  return maxLength;
};

console.log(`Length of Longest Common Subsequence: ---> ${findLCSLength('abdca', 'cbda')}`);
console.log(`Length of Longest Common Subsequence: ---> ${findLCSLength('passport', 'ppsspt')}`);
```

The time and space complexity of the above algorithm is `O(m*n)`, where ‘m’ and ‘n’ are the lengths of the two input strings.

## Optimization

We can do this using O(n) space. We only need the current row and one previous row.

```js
const findLCSLength = function (s1, s2) {
  const dp = Array(2)
    .fill(0)
    .map(() => Array(s2.length + 1).fill(0));

  let maxLength = 0;
  for (let i = 1; i <= s1.length; i++) {
    for (let j = 1; j <= s2.length; j++) {
      if (s1[i - 1] === s2[j - 1]) {
        dp[i % 2][j] = 1 + dp[(i - 1) % 2][j - 1];
      } else {
        dp[i % 2][j] = Math.max(dp[(i - 1) % 2][j], dp[i % 2][j - 1]);
      }

      maxLength = Math.max(maxLength, dp[i % 2][j]);
    }
  }
  return maxLength;
};

console.log(`Length of Longest Common Subsequence: ---> ${findLCSLength('abdca', 'cbda')}`);
console.log(`Length of Longest Common Subsequence: ---> ${findLCSLength('passport', 'ppsspt')}`);
```
