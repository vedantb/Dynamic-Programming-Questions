## Problem Statement

Given a string, we want to cut it into pieces such that each piece is a palindrome. Write a function to return the minimum number of cuts needed.

Example 1:

```js
Input: "abdbca"
Output: 3
Explanation: Palindrome pieces are "a", "bdb", "c", "a".
```

Example 2:

```js
Input: = "cddpd"
Output: 2
Explanation: Palindrome pieces are "c", "d", "dpd".
```

Example 3:

```js
Input: = "pqr"
Output: 2
Explanation: Palindrome pieces are "p", "q", "r".
```

Example 4:

```js
Input: = "pp"
Output: 0
Explanation: We do not need to cut, as "pp" is a palindrome.
```

## Basic Solution

The problem follows the Longest Palindromic Subsequence pattern and a shares a similar approach to Longest Palindromic Substring

The brute-force solution will be to try all the substring combinations of the given string. We can start processing from the beginning of the string and keep adding one character at a time. At any step, if we get a palindrome, we take it as one piece and recursively process the remaining length of the string to find the minimum cuts needed.

Here is the code:

```js
const findMPPCuts = (st) => {
    let findMPPCutsHelper = (st, startIndex, endIndex) => {
        // we don't need to cut the string if it is a palindrome
        if (startIndex >= endIndex || isPalindrome(st, startIndex, endIndex)) {
            return 0;
        }

        // at max we need to cut the string into 'length - 1' pieces
        let minimumCuts = endIndex - startIndex;
        for (let i = startIndex; i <= endIndex; i++) {
            if (isPalindrome(st, startIndex, i)) {
                // we can cut here as we have a palindrome from 'startIndex' to 'i'
                minimumCuts = Math.min(minimumCuts, 1 + findMPPCutsHelper(st, i + 1, endIndex));
            }
        }
        return minimumCuts;
    };

    let isPalindrome = (st, x, y) => {
        while (x <= y) {
            if (st[x++] !== st[y--]) {
                return false;
            }
        }
        return true;
    };

    return findMPPCutsHelper(st, 0, st.length - 1);
};
console.log(`Minimum palindrome partitions ---> ${findMPPCuts('abdbca')}`);
console.log(`Minimum palindrome partitions ---> ${findMPPCuts('cdpdd')}`);
console.log(`Minimum palindrome partitions ---> ${findMPPCuts('pqr')}`);
console.log(`Minimum palindrome partitions ---> ${findMPPCuts('pp')}`);
```

The time complexity of the above algorithm is exponential O(2^n), where ‘n’ is the length of the input string. The space complexity is O(n) which is used to store the recursion stack.

## Top-down Dynamic Programming with Memoization

We can memoize both function, `findMPPCutsHelper()` and `isPalindrome()`. The two changing values in both these functions are the two indexes; therefore, we can store the results of all the subproblems in a two-dimensional array.

**Code:**

```js
const findMPPCuts = (st) => {
    const dp = [];
    const dpIsPalindrome = [];

    let findMPPCutsHelper = (st, startIndex, endIndex) => {
        // we don't need to cut the string if it is a palindrome
        if (startIndex >= endIndex || isPalindrome(st, startIndex, endIndex)) {
            return 0;
        }

        dp[startIndex] = dp[startIndex] || [];

        if (endIndex in dp[startIndex]) return dp[startIndex][endIndex];

        // at max we need to cut the string into 'length - 1' pieces
        let minimumCuts = endIndex - startIndex;
        for (let i = startIndex; i <= endIndex; i++) {
            if (isPalindrome(st, startIndex, i)) {
                // we can cut here as we have a palindrome from 'startIndex' to 'i'
                minimumCuts = Math.min(minimumCuts, 1 + findMPPCutsHelper(st, i + 1, endIndex));
            }
        }
        dp[startIndex][endIndex] = minimumCuts;
        return dp[startIndex][endIndex];
    };

    let isPalindrome = (st, x, y) => {
        dpIsPalindrome[x] = dpIsPalindrome[x] || [];
        if (y in dpIsPalindrome[x]) return dpIsPalindrome[x][y];

        let i = x,
            j = y;
        while (i <= j) {
            if (st[i++] !== st[j--]) {
                dpIsPalindrome[x][y] = false;
                return dpIsPalindrome[x][y];
            }
        }

        dpIsPalindrome[x][y] = true;
        return dpIsPalindrome[x][y];
    };

    return findMPPCutsHelper(st, 0, st.length - 1);
};
console.log(`Minimum palindrome partitions ---> ${findMPPCuts('abdbca')}`);
console.log(`Minimum palindrome partitions ---> ${findMPPCuts('cdpdd')}`);
console.log(`Minimum palindrome partitions ---> ${findMPPCuts('pqr')}`);
console.log(`Minimum palindrome partitions ---> ${findMPPCuts('pp')}`);
```

## Bottom-up Dynamic Programming

The above solution tells us that we need to build two tables, one for the `isPalindrome()` and one for finding the minimum cuts needed.

If you remember, we built a table in the Longest Palindromic Substring (LPS) problem that can tell us what substrings (of the input string) are palindrome. We will use the same approach here to build the table required for `isPalindrome()`. For example, here is the final output from LPS for "cddpd". From this table we can clearly see that the `substring(2,4) => 'dpd'` is a palindrome.

![alt text](https://imgur.com/3bfufMk.png 'LPS')

To build the second table for finding the minimum cuts, we can iterate through the first table built for `isPalindrome()`. At any step, if we get a palindrome, we can cut the string there. This means minimum cuts will be one plus the cuts needed for remaining string.

```js
const findMPPCuts = (st) => {
    // isPalindrome[i][j] will be 'true' if the string from index 'i' to 'j' is a palindrome
    const isPalindrome = Array(st.length)
        .fill(false)
        .map(() => Array(st.length).fill(false));

    // every string with one character is a palindrome
    for (let i = 0; i < st.length; i++) {
        isPalindrome[i][i] = true;
    }

    // populate the isPalindrome table
    for (let startIndex = st.length - 1; startIndex >= 0; startIndex--) {
        for (let endIndex = startIndex + 1; endIndex < st.length; endIndex++) {
            if (st[startIndex] === st[endIndex]) {
                // if it's a two character string or the remaining string is a palindrome too
                if (endIndex - startIndex === 1 || isPalindrome[startIndex + 1][endIndex - 1]) {
                    isPalindrome[startIndex][endIndex] = true;
                }
            }
        }
    }

    // populating the second table, every index in 'cuts' stores the minimum cuts needed for the substring
    // from that index till the end
    const cuts = Array(st.length).fill(0);

    for (let startIndex = st.length - 1; startIndex >= 0; startIndex--) {
        let minimumCuts = st.length;
        for (let endIndex = st.length - 1; endIndex >= startIndex; endIndex--) {
            if (isPalindrome[startIndex][endIndex]) {
                // we can cut here as we have a palindrome
                // also we don't need any cut if the whole thing is a palindrome
                minimumCuts = endIndex === st.length - 1 ? 0 : Math.min(minimumCuts, 1 + cuts[endIndex + 1]);
            }
        }
        cuts[startIndex] = minimumCuts;
    }

    return cuts[0];
};

console.log(`Minimum palindrome partitions ---> ${findMPPCuts('abdbca')}`);
console.log(`Minimum palindrome partitions ---> ${findMPPCuts('cdpdd')}`);
console.log(`Minimum palindrome partitions ---> ${findMPPCuts('pqr')}`);
console.log(`Minimum palindrome partitions ---> ${findMPPCuts('pp')}`);
console.log(`Minimum palindrome partitions ---> ${findMPPCuts('madam')}`);
```

The time and space complexity of the above algorithm is O(n^2), where ‘n’ is the length of the input string.
