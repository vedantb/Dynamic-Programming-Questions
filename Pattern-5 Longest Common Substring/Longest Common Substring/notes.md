## Problem Statement

Given two strings 's1' and 's2', find the length of the longest substring which is common in both the strings.

Example 1:

```js
Input: s1 = "abdca"
       s2 = "cbda"
Output: 2
Explanation: The longest common substring is "bd".
```

Example 2:

```js
Input: s1 = "passport"
       s2 = "ppsspt"
Output: 3
Explanation: The longest common substring is "ssp".
```

## Basic Solution

A basic brute-force solution could be to try all substrings of ‘s1’ and ‘s2’ to find the longest common one. We can start matching both the strings one character at a time, so we have two options at any step:

1. If the strings have a matching character, we can recursively match for the remaining lengths and keep a track of the current matching length.
2. If the strings don't match, we start two new recursive calls by skipping one character separately from each string and reset the matching length.

The length of the LCS will be the max returned by the three recursive calls in the above two options:

**Code:**

```js
const findLCSLength = (s1, s2) => {
    let findLCSHelper = (s1, s2, i1, i2, count) => {
        if (i1 === s1.length || i2 === s2.length) return count;

        if (s1[i1] === s2[i2]) {
            count = findLCSHelper(s1, s2, i1 + 1, i2 + 1, count + 1);
        }

        const c1 = findLCSHelper(s1, s2, i1, i2 + 1, 0);
        const c2 = findLCSHelper(s1, s2, i1 + 1, i2, 0);

        return Math.max(count, Math.max(c1, c2));
    };
    return findLCSHelper(s1, s2, 0, 0, 0);
};

console.log(`Length of Longest Common Substring: ---> ${findLCSLength('abdca', 'cbda')}`);
console.log(`Length of Longest Common Substring: ---> ${findLCSLength('passport', 'ppsspt')}`);
```

Because of the three recursive calls, the time complexity of the above algorithm is exponential O(3^{m+n}), where ‘m’ and ‘n’ are the lengths of the two input strings. The space complexity is O(m+n), this space will be used to store the recursion stack.

## Top-Down Dynamic Programming with Memoization

We can use an array to store the already solved subproblems.

The three changing values to our recursive function are the two indexes (i1 and i2) and the ‘count’. Therefore, we can store the results of all subproblems in a three-dimensional array.

**Code:**

```js
const findLCSLength = (s1, s2) => {
    const maxLength = Math.min(s1.length, s2.length);
    const dp = [];
    let findLCSHelper = (s1, s2, i1, i2, count) => {
        if (i1 === s1.length || i2 === s2.length) return count;

        dp[i1] = dp[i1] || [];
        dp[i1][i2] = dp[i1][i2] || [];

        if (count in dp[i1][i2]) return dp[i1][i2][count];

        let c3 = count;
        if (s1[i1] === s2[i2]) {
            c3 = findLCSHelper(s1, s2, i1 + 1, i2 + 1, count + 1);
        }

        const c1 = findLCSHelper(s1, s2, i1, i2 + 1, 0);
        const c2 = findLCSHelper(s1, s2, i1 + 1, i2, 0);

        dp[i1][i2][count] = Math.max(c3, Math.max(c1, c2));
        return dp[i1][i2][count];
    };
    return findLCSHelper(s1, s2, 0, 0, 0);
};

console.log(`Length of Longest Common Substring: ---> ${findLCSLength('abdca', 'cbda')}`);
console.log(`Length of Longest Common Substring: ---> ${findLCSLength('passport', 'ppsspt')}`);
```

## Bottom-up Dynamic Programming

Since we want to match all the substrings of the given two strings, we can use a two-dimensional array to store our results. The lengths of the two strings will define the size of the two dimensions of the array. So for every index ‘i’ in string ‘s1’ and ‘j’ in string ‘s2’, we have two options:

1. If the character at `s1[i]` matches `s2[j]`, the length of the common substring would be one plus the length of the common substring till `i-1` and `j-1` indexes in the two strings.
2. If the character at the `s1[i]` does not match `s2[j]`, we don’t have any common substring.

```js
if s1[i] === s2[j]
  dp[i][j] = 1 + dp[i-1][j-1]
else
  dp[i][j] = 0
```

Let’s draw this visually for “abcda” and “cbda”. Starting with a substring of zero lengths, if any one of the string has zero length, then the common substring will be of zero length:

![alt text](https://imgur.com/2tc5EbZ.png 'LCS')

`i:1, j:1 => dp[i][j] = 0, as s1[i] != s2[j]`

![alt text](https://imgur.com/EUea4Z1.png 'LCS')

`i:3, j:3 => dp[i][j] = 1 + dp[i-1][j-1], as s1[i] == s2[j]`

![alt text](https://imgur.com/VEu9jfo.png 'LCS')

`i:4, j:5 => dp[i][j] = 1 + dp[i-1][j-1], as s1[i] == s2[j]`

![alt text](https://imgur.com/oj0Gi4j.png 'LCS')

From the above visualization, we can clearly see that the longest common substring is of length ‘2’-- as shown by `dp[3][3]`. Here is the code for our bottom-up dynamic programming approach:

```js
const findLCSLength = (s1, s2) => {
    const dp = Array(s1.length + 1)
        .fill(0)
        .map(() => Array(s2.length + 1).fill(0));

    let maxLength = 0;

    for (let i = 1; i <= s1.length; i++) {
        for (let j = 1; j <= s2.length; j++) {
            if (s1[i - 1] === s2[j - 1]) {
                dp[i][j] = 1 + dp[i - 1][j - 1];
                maxLength = Math.max(maxLength, dp[i][j]);
            }
        }
    }
    return maxLength;
};

console.log(`Length of Longest Common Substring: ---> ${findLCSLength('abdca', 'cbda')}`);
console.log(`Length of Longest Common Substring: ---> ${findLCSLength('passport', 'ppsspt')}`);
```

The time and space complexity of the above algorithm is `O(m*n)`, where ‘m’ and ‘n’ are the lengths of the two input strings.

## Optimization

This just used O(n) space.

```js
const findLCSLength = function (s1, s2) {
    const dp = Array(2)
        .fill(0)
        .map(() => Array(s2.length + 1).fill(0));

    let maxLength = 0;
    for (let i = 1; i <= s1.length; i++) {
        for (let j = 1; j <= s2.length; j++) {
            dp[i % 2][j] = 0;
            if (s1.charAt(i - 1) == s2.charAt(j - 1)) {
                dp[i % 2][j] = 1 + dp[(i - 1) % 2][j - 1];
                maxLength = Math.max(maxLength, dp[i % 2][j]);
            }
        }
    }
    return maxLength;
};

console.log(`Length of Longest Common Substring: ---> ${findLCSLength('abdca', 'cbda')}`);
console.log(`Length of Longest Common Substring: ---> ${findLCSLength('passport', 'ppsspt')}`);
```
