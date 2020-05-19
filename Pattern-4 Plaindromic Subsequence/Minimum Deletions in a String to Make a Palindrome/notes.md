## Problem Statement

Given a string, find the minimum number of characters that we can remove to make it a palindrome.

Example 1:

```js
Input: "abdbca"
Output: 1
Explanation: By removing "c", we get a palindrome "abdba".
```

Example 2:

```js
Input: = "cddpd"
Output: 2
Explanation: Deleting "cp", we get a palindrome "ddd".
```

Example 3:

```js
Input: = "pqr"
Output: 2
Explanation: We have to remove any two characters to get a palindrome, e.g. if we remove "pq", we get palindrome "r".
```

## Solution

The problem can be easily converted to the Longest Palindromic Subsequence (LPS) problem. We can use the fact that LPS is the best sequence we can have, so any character that is not part of LPS must be removed. Please note that it's the "Longest Palindromic Subsequence" and not "Longest Palindrome Substring".

So, our solution for a given string "st" will be:

```js
Minimum_deletions_to_make_palindrome = Length(st) - LPS(st);
```

**Code:**

```js
let findMinimumDeletions = (st) => {
    let dp = Array(st.length)
        .fill(0)
        .map(() => Array(st.length).fill(0));

    // every sequence with one element is a palindrome of length 1
    for (let i = 0; i < st.length; i++) {
        dp[i][i] = 1;
    }

    for (let startIndex = st.length - 1; startIndex >= 0; startIndex--) {
        for (let endIndex = startIndex + 1; endIndex < st.length; endIndex++) {
            // case1: elements at beginning and end are same
            if (st[startIndex] === st[endIndex]) {
                dp[startIndex][endIndex] = 2 + dp[startIndex + 1][endIndex - 1];
            } else {
                // case2: skip one element either from the beginning or end
                dp[startIndex][endIndex] = Math.max(dp[startIndex][endIndex - 1], dp[startIndex + 1][endIndex]);
            }
        }
    }

    // subtracting the length of Longest Palindromic Subsequence from the length of
    // the input string to get minimum number of deletions
    return st.length - dp[0][st.length - 1];
};

console.log('Minimum number of deletions required ---> ' + findMinimumDeletions('abdbca'));
console.log('Minimum number of deletions required ---> ' + findMinimumDeletions('cddpd'));
console.log('Minimum number of deletions required ---> ' + findMinimumDeletions('pqr'));
```

The time and space complexity of the above algorithm is O(n^2), where ‘n’ is the length of the input string.

## Similar Problems

1.  Minimum insertions in a string to make it a palindrome

Will the above approach work if we make insertions instead of deletions?

Yes, the length of the Longest Palindromic Subsequence is the best palindromic subsequence we can have. Let’s take a few examples:

Example 1:

```js
Input: 'abdbca';
Output: 1;
```

Explanation: By inserting "c", we get a palindrome "acbdbca"

Example 2:

```js
Input: = "cddpd"
Output: 2
Explanation: Inserting “cp”, we get a palindrome “cdpdpdc”. We can also get a palindrome by inserting “dc”: “cddpddc”
```

Example 3:

```js
Input: = "pqr"
Output: 2
Explanation: We have to insert any two characters to get a palindrome (e.g. if we insert “pq”, we get a palindrome “pqrqp”).
```

2. Find if a string is K-palindromic

Any string will be called K-palindromic if it can be transformed into a palindrome by removing at most ‘K’ characters from it.

This problem can easily be converted to our base problem of finding the minimum deletions in a string to make it a palindrome. If the “minimum deletion count” is not more than ‘K’, the string will be K-Palindromic.
