## Problem Statement

Given a string, find the length of its Longest Palindromic Substring (LPS). In a palindromic string, elements read the same backward and forward.

Example 1:

```js
Input: "abdbca"
Output: 3
Explanation: LPS is "bdb".
```

Example 2:

```js
Input: = "cddpd"
Output: 3
Explanation: LPS is "dpd".
```

Example 3:

```js
Input: = "pqr"
Output: 1
Explanation: LPS could be "p", "q" or "r".
```

## Basic Solution

The problem follows the longest palindromic subsequence pattern. The only difference is that in a palindromic subsequence characters can be non-adjacent, whereas in a substring all characters should form a palindrome. We will follow a similar approach though.

The brute-force solution will be to try all the substrings of the given string. We can start processing from the beginning and the end of the string. So at any step, we will have two options:

1. If the element at the beginning and the end are the same, we make a recursive call to check if the remaining substring is also a palindrome. If so, the substring is a palindrome from beginning to the end.

2. We will skip either the element from the beginning or the end to make two recursive calls for the remaining substring. The length of LPS would be the maximum of these two recursive calls.

**Code:**

```js
let findLPSLength = (st) => {
    let findLpsLengthHelper = (st, startIndex, endIndex) => {
        if (startIndex > endIndex) return 0;

        // every string with one character is a palindrome
        if (startIndex === endIndex) return 1;

        // case 1: elements at the beginning and the end are the same
        if (st[startIndex] === st[endIndex]) {
            const remainingLength = endIndex - startIndex - 1;
            // check if the remaining string is also a palindrome
            if (remainingLength === findLpsLengthHelper(st, startIndex + 1, endIndex - 1)) {
                return remainingLength + 2;
            }
        }

        // case 2: skip one character either from beginning or end
        const c1 = findLpsLengthHelper(st, startIndex + 1, endIndex);
        const c2 = findLpsLengthHelper(st, startIndex, endIndex - 1);
        return Math.max(c1, c2);
    };

    return findLpsLengthHelper(st, 0, st.length - 1);
};

console.log(`Length of LPS ---> ${findLPSLength('abdbca')}`);
console.log(`Length of LPS ---> ${findLPSLength('cddpd')}`);
console.log(`Length of LPS ---> ${findLPSLength('pqr')}`);
```

Due to the three recursive calls, the time complexity of the above algorithm is exponential O(3^n), where 'n' is the length of the input string. The space complexity is O(n) which is used to store the recursion stack.

## Top-down Dynamic Programming with Memoization

We can use an array to store the already solved subproblems.

The two changing values to our recursive function are the two indexes, startIndex and endIndex. Therefore, we can store the results of all the subproblems in a two-dimensional array. (Another alternative could be to use a hash-table whose key would be a string (startIndex + “|” + endIndex))

```js
let findLPSLength = (st) => {
    const dp = [];
    let findLpsLengthHelper = (st, startIndex, endIndex) => {
        if (startIndex > endIndex) return 0;

        // every string with one character is a palindrome
        if (startIndex === endIndex) return 1;

        dp[startIndex] = dp[startIndex] || [];

        if (endIndex in dp[startIndex]) return dp[startIndex][endIndex];

        // case 1: elements at the beginning and the end are the same
        if (st[startIndex] === st[endIndex]) {
            const remainingLength = endIndex - startIndex - 1;
            // check if the remaining string is also a palindrome
            if (remainingLength === findLpsLengthHelper(st, startIndex + 1, endIndex - 1)) {
                dp[startIndex][endIndex] = remainingLength + 2;
                return dp[startIndex][endIndex];
            }
        }

        // case 2: skip one character either from beginning or end
        const c1 = findLpsLengthHelper(st, startIndex + 1, endIndex);
        const c2 = findLpsLengthHelper(st, startIndex, endIndex - 1);
        dp[startIndex][endIndex] = Math.max(c1, c2);
        return dp[startIndex][endIndex];
    };

    return findLpsLengthHelper(st, 0, st.length - 1);
};

console.log(`Length of LPS ---> ${findLPSLength('abdbca')}`);
console.log(`Length of LPS ---> ${findLPSLength('cddpd')}`);
console.log(`Length of LPS ---> ${findLPSLength('pqr')}`);
```

The above algorithm has a time and space complexity of O(n^2) because we will not have more than `n*n` subproblems.

## Bottom-up Dynamic Programming

Since we want to try all the substrings of the given string, we can use a two-dimensional array to store the subproblems’ results. So `dp[i][j]` will be 'true' if the substring from index 'i' to index 'j' is a palindrome.

We can start from the beginning of the string and keep adding one element at a time. At every step, we will try all of its substrings. So for every `endIndex` and `startIndex` in the given string, we need to check:

If the element at `startIndex` matches `endIndex`, we will further check if the remaining substring (from `startIndex + 1` to `endIndex - 1`) is a substring too.

```js
if st[startIndex] == st[endIndex], and
        if the remaing string is of zero length or dp[startIndex+1][endIndex-1] is a palindrome then
   dp[startIndex][endIndex] = true
```

Let's draw this visually for "cddpd", starting with a substring of length '1'. As we know, every substring with one element is a palindrome.

![alt text](https://imgur.com/Veqgf8H.png 'LPS')

`startIndex:3, endIndex:4 => since st[startIndex] != st[endIndex] => false`

![alt text](https://imgur.com/XCtLrCM.png 'LPS')

`startIndex:2, endIndex:3 => since st[startIndex] != st[endIndex] => false`

![alt text](https://imgur.com/7TyU6KU.png 'LPS')

`startIndex:2, endIndex:4 => since st[startIndex] == st[endIndex] and dp[startIndex+1][endIndex-1] is true => true`

![alt text](https://imgur.com/7o5JACa.png 'LPS')

`startIndex:0, endIndex:1-4 => since st[startIndex] != st[endIndex] => false`

![alt text](https://imgur.com/Kb3XZzl.png 'LPS')

**Code:**

```js
let findLPSLength = (st) => {
    // dp[i][j] will be 'true' if the string from index 'i' to index 'j' is a palindrome
    let dp = Array(st.length)
        .fill(false)
        .map(() => Array(st.length).fill(false));

    // every string with one character is a palindrome
    for (let i = 0; i < st.length; i++) {
        dp[i][i] = true;
    }

    let maxLength = 1;
    for (let startIndex = st.length - 1; startIndex >= 0; startIndex--) {
        for (let endIndex = startIndex + 1; endIndex < st.length; endIndex++) {
            // case 1: elements at beginning and end are same
            if (st[startIndex] === st[endIndex]) {
                // if it's a two character string or if the remaining string is a palindrome too
                if (endIndex - startIndex === 1 || dp[startIndex + 1][endIndex - 1]) {
                    dp[startIndex][endIndex] = true;
                    maxLength = Math.max(maxLength, endIndex - startIndex + 1);
                }
            }
        }
    }

    return maxLength;
};

console.log(`Length of LPS ---> ${findLPSLength('abdbca')}`);
console.log(`Length of LPS ---> ${findLPSLength('cddpd')}`);
console.log(`Length of LPS ---> ${findLPSLength('pqr')}`);
```

The time and space complexity of the above algorithm is `O(n^2)`, where ‘n’ is the length of the input string.

## Manacher's Algorithm

The best-known algorithm to find the longest palindromic substring which runs in linear time O(n)O(n) is Manacher’s Algorithm. However, it is a non-trivial algorithm that doesn’t use DP.
