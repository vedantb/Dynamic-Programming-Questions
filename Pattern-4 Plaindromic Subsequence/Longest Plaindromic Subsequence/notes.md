## Problem Statement

Given a sequence, find the length of its Longest Palindromic Subsequence (LPS). In a palindromic subsequence, elements read the same forward and backward.

A subsequence is a sequence that can be derived from another sequence by deleting somee or no elements without changing the order of the remaining elements.

Example 1:

```js
Input: 'abdbca';
Output: 5;
Explanation: LPS is "abdba".
```

Example 2:

```js
Input: = "cddpd"
Output: 3
Explanation: LPS is "ddd".
```

Example 3:

```js
Input: = "pqr"
Output: 1
Explanation: LPS could be "p", "q" or "r".
```

## Basic Solution

A basic brute-force solution could be to try all the subsequences of the given sequence. We can start processing from the beginning and the end of the sequence. So at any step, we have two options:

1. If the element at the beginning and end are the same, we increment our count by two and make a recursive call for the remaining sequence.
2. We will skip the element either from the beginning or the end to make two recursive calls for the remaining subsequence.

If option one applies then it will give us the length of LPS; otherwise, the length of LPS will be the maximum number returned by the two recurse calls from the second option.

**Code:**

```js
let findLPSLength = (st) => {
    let findLPSLengthHelper = (st, startIndex, endIndex) => {
        if (startIndex > endIndex) return 0;

        // every sequence with one element is a palindrome of length 1
        if (startIndex === endIndex) return 1;

        // case 1: elements at beginning and end are same
        if (st[startIndex] === st[endIndex]) return 2 + findLPSLengthHelper(st, startIndex + 1, endIndex - 1);

        // case 2: skip one element either from the beginning or the end
        let c1 = findLPSLengthHelper(st, startIndex + 1, endIndex);
        let c2 = findLPSLengthHelper(st, startIndex, endIndex - 1);
        return Math.max(c1, c2);
    };
    return findLPSLengthHelper(st, 0, st.length - 1);
};

console.log('Length of LPS ---> ' + findLPSLength('abdbca'));
console.log('Length of LPS ---> ' + findLPSLength('cddpd'));
console.log('Length of LPS ---> ' + findLPSLength('pqr'));
```

The time complexity of the above algorithm is exponential O(2^n), where 'n' is the length of the input sequence. The space complexity is O(n) which is used to store the recursion stack.

## Top-down Dynamic Programming with Memoization

We can use an array to store the already solved subproblems.

The two changing values to our recursive function are the two indexes, startIndex and endIndex. Therefore, we can store the results of all the subproblems in a two-dimensional array. (Another alternative could be to use a hash-table whose key would be a string (startIndex + "|" + endIndex))

**Code:**

```js
let findLPSLength = (st) => {
    let dp = [];

    let findLPSLengthHelper = (st, startIndex, endIndex) => {
        if (startIndex > endIndex) return 0;

        // every sequence with one element is a palindrome of length 1
        if (startIndex === endIndex) return 1;

        dp[startIndex] = dp[startIndex] || [];

        if (endIndex in dp[startIndex]) return dp[startIndex][endIndex];

        if (st[startIndex] === st[endIndex]) {
            // case 1: elements at beginning and end are same
            dp[startIndex][endIndex] = 2 + findLPSLengthHelper(st, startIndex + 1, endIndex - 1);
        } else {
            // case 2: skip one element either from the beginning or the end
            let c1 = findLPSLengthHelper(st, startIndex + 1, endIndex);
            let c2 = findLPSLengthHelper(st, startIndex, endIndex - 1);
            dp[startIndex][endIndex] = Math.max(c1, c2);
        }

        return dp[startIndex][endIndex];
    };

    return findLPSLengthHelper(st, 0, st.length - 1);
};

console.log('Length of LPS ---> ' + findLPSLength('abdbca'));
console.log('Length of LPS ---> ' + findLPSLength('cddpd'));
console.log('Length of LPS ---> ' + findLPSLength('pqr'));
```

Since our memoization array `dp[st.length][st.length]` stores the results of all subproblems, we can conclude that we will not have more than `N * N` subproblems. This means that our time complexity is O(N^2).

The above algorithm will be using O(N^2) space for the memoization array. Other than that we will use O(N) space for the recursion call-stack. So the total space will be O(N^2 + N), which is asymptotically equivalent to O(N^2).

## Bottom-up Dynamic Programming

Since we want to try all the subsequences of the given sequence, we can use a two-dimensional array to store our results. We can start from the beginning of the sequence and keep adding one element at a time. At every step, we will try all of its subsequences. So for every `startIndex` and `endIndex` in the given string, we will choose one of the following two options:

1. If the element at the `startIndex` matches the element at the `endIndex`, the length of the LPS would be 2 + the length of LPS till `startIndex + 1` and `endIndex - 1`.
2. If the element at `startIndex` does not match the element at `endIndex`, we will take the maximum LPS created by either skipping element at `startIndex` or the `endIndex`.

```js
if st[endIndex] == st[startIndex]
  dp[startIndex][endIndex] = 2 + dp[startIndex + 1][endIndex - 1]
else
  dp[startIndex][endIndex] = Math.max(dp[startIndex + 1][endIndex], dp[startIndex][endIndex - 1])
```

Let's draw this visually for "cddpd", starting with a subsequence of length '1'. As we know, every sequence with one element is a palindrome of length 1:

![alt text](https://imgur.com/VYV0Ytn.png 'LPS')

`startIndex:3, endIndex:4 => st[startIndex] !=st[endIndex], so dp[startIndex][endIndex] = max(dp[startIndex + 1][endIndex], dp[startIndex][endIndex - 1])`

![alt text](https://imgur.com/nZar4rQ.png 'LPS')

`startIndex:2, endIndex:3 => st[startIndex] !=st[endIndex], so dp[startIndex][endIndex] = max(dp[startIndex + 1][endIndex], dp[startIndex][endIndex - 1])`

![alt text](https://imgur.com/JQTaKb2.png 'LPS')

`startIndex:2, endIndex:4 => st[startIndex] ==st[endIndex], so dp[startIndex][endIndex] = 2 + dp[startIndex + 1][endIndex - 1]`

![alt text](https://imgur.com/8jeq6w8.png 'LPS')

`startIndex:0, endIndex:4 => st[startIndex] !=st[endIndex], so dp[startIndex][endIndex] = max(dp[startIndex + 1][endIndex], dp[startIndex][endIndex - 1])`

![alt text](https://imgur.com/lwTQLL4.png 'LPS')

From the above visualization, we can clearly see that the length of LPS is ‘3’ as shown by `dp[0][4]`.

**Code:**

```js
let findLPSLength = (st) => {
    // dp[i][j] stores the length of LPS from index 'i' to index 'j'

    let dp = Array(st.length)
        .fill(0)
        .map(() => Array(st.length).fill(0));

    // every sequence with one element is a palindrome of length 1
    for (let i = 0; i < st.length; i++) {
        dp[i][i] = 1;
    }

    for (let startIndex = st.length - 1; startIndex >= 0; startIndex--) {
        for (let endIndex = startIndex + 1; endIndex < st.length; endIndex++) {
            // case 1: elements at beginning and end are same
            if (st[startIndex] === st[endIndex]) {
                dp[startIndex][endIndex] = 2 + dp[startIndex + 1][endIndex - 1];
            } else {
                // case 2: skip one element either from beginning or end
                dp[startIndex][endIndex] = Math.max(dp[startIndex + 1][endIndex], dp[startIndex][endIndex - 1]);
            }
        }
    }

    return dp[0][st.length - 1];
};

console.log('Length of LPS ---> ' + findLPSLength('abdbca'));
console.log('Length of LPS ---> ' + findLPSLength('cddpd'));
console.log('Length of LPS ---> ' + findLPSLength('pqr'));
```

The time and space complexity of the above algorithm is O(n^2), where ‘n’ is the length of the input sequence.
