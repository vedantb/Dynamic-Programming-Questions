## Problem Statement

Given two sequences ‘s1’ and ‘s2’, write a method to find the length of the shortest sequence which has ‘s1’ and ‘s2’ as subsequences.

Example 1:

```js
Input: s1: "abcf" s2:"bdcf"
Output: 5
Explanation: The shortest common super-sequence (SCS) is "abdcf".
```

Example 2:

```js
Input: s1: "dynamic" s2:"programming"
Output: 15
Explanation: The SCS is "dynprogrammicng".
```

## Basic Solution

A basic brute-force solution could be to try all the super-sequences of the given sequences. We can process both of the sequences one character at a time, so at any step we must choose between:

1. If the sequences have a matching character, we can skip one character from both the sequences and make a recursive call for the remaining lengths to get SCS.

2. If the strings don’t match, we start two new recursive calls by skipping one character separately from each string. The minimum of these two recursive calls will have our answer.

**Code:**

```js
const findSCSLength = (s1, s2) => {
    let findSCSLengthHelper = (s1, s2, i1, i2) => {
        // if we have reached the end of a string, return the remaining length of the other string, as in
        // this case we have to take all of the remaing other string
        if (i1 === s1.length) return s2.length - i2;
        if (i2 === s2.length) return s1.length - i1;

        if (s1[i1] === s2[i2]) return 1 + findSCSLengthHelper(s1, s2, i1 + 1, i2 + 1);

        let length1 = 1 + findSCSLengthHelper(s1, s2, i1, i2 + 1);
        let length2 = 1 + findSCSLengthHelper(s1, s2, i1 + 1, i2);

        return Math.min(length1, length2);
    };
    return findSCSLengthHelper(s1, s2, 0, 0);
};

console.log(`Length of Shortest Common Subsequence: Substring: ---> ${findSCSLength('abcf', 'bdcf')}`);
console.log(`Length of Shortest Common Subsequence: Substring: ---> ${findSCSLength('dynamic', 'programming')}`);
```

The time complexity of the above algorithm is exponential O(2^{n+m}), where ‘n’ and ‘m’ are the lengths of the input sequences. The space complexity is O(n+m) which is used to store the recursion stack.

## Top-down Dynamic Programming with Memoization

Let’s use memoization to overcome the overlapping subproblems.

The two changing values to our recursive function are the two indexes, i1 and i2. Therefore, we can store the results of all the subproblems in a two-dimensional array.

**Code:**

```js
const findSCSLength = (s1, s2) => {
    const dp = [];
    let findSCSLengthHelper = (s1, s2, i1, i2) => {
        // if we have reached the end of a string, return the remaining length of the other string, as in
        // this case we have to take all of the remaing other string
        if (i1 === s1.length) return s2.length - i2;
        if (i2 === s2.length) return s1.length - i1;

        dp[i1] = dp[i1] || [];

        if (i2 in dp[i1]) return dp[i1][i2];

        if (s1[i1] === s2[i2]) {
            dp[i1][i2] = 1 + findSCSLengthHelper(s1, s2, i1 + 1, i2 + 1);
        } else {
            let length1 = 1 + findSCSLengthHelper(s1, s2, i1, i2 + 1);
            let length2 = 1 + findSCSLengthHelper(s1, s2, i1 + 1, i2);
            dp[i1][i2] = Math.min(length1, length2);
        }

        return dp[i1][i2];
    };
    return findSCSLengthHelper(s1, s2, 0, 0);
};

console.log(`Length of Shortest Common Subsequence: Substring: ---> ${findSCSLength('abcf', 'bdcf')}`);
console.log(`Length of Shortest Common Subsequence: Substring: ---> ${findSCSLength('dynamic', 'programming')}`);
```

## Bottom-up Dynamic Programming

Since we want to match all the subsequences of the given sequences, we can use a two-dimensional array to store our results. The lengths of the two strings will define the size of the array’s dimensions. So for every index ‘i’ in sequence ‘s1’ and ‘j’ in sequence ‘s2’, we will choose one of the following two options:

1. If the character `s1[i]` matches `s2[j]`, the length of the SCS would be the one plus the length of the SCS till `i-1` and `j-1` indexes in the two strings.
2. If the character `s1[i]` does not match `s2[j]`, we will consider two SCS: one without `s1[i]` and one without `s2[j]`. Our required SCS length will be the shortest of these two super-sequences plus one.

So our recursive formula would be:

```js
if s1[i] == s2[j]
  dp[i][j] = 1 + dp[i-1][j-1]
else
  dp[i][j] = 1 + min(dp[i-1][j], dp[i][j-1])
```

**Code:**

```js
const findSCSLength = (s1, s2) => {
    const dp = Array(s1.length + 1)
        .fill(0)
        .map(() => Array(s2.length + 1).fill(0));

    // if one of the strings is of zero length, SCS would be equal to the length of the other string
    for (let i = 0; i <= s1.length; i++) dp[i][0] = i;
    for (let j = 0; j <= s2.length; j++) dp[0][j] = j;

    for (let i = 1; i <= s1.length; i++) {
        for (let j = 1; j <= s2.length; j++) {
            if (s1[i - 1] == s2[j - 1]) dp[i][j] = 1 + dp[i - 1][j - 1];
            else dp[i][j] = 1 + Math.min(dp[i - 1][j], dp[i][j - 1]);
        }
    }
    return dp[s1.length][s2.length];
};

console.log(`Length of Shortest Common Subsequence: Substring: ---> ${findSCSLength('abcf', 'bdcf')}`);
console.log(`Length of Shortest Common Subsequence: Substring: ---> ${findSCSLength('dynamic', 'programming')}`);
```

The time and space complexity of the above algorithm is `O(n*m)`.
