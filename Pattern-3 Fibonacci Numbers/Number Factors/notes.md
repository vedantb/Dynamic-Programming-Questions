## Problem Statement

Given a number ‘n’, implement a method to count how many possible ways there are to express ‘n’ as the sum of 1, 3, or 4.

Example 1:

```js
n : 4
Number of ways = 4
Explanation: Following are the four ways we can exoress 'n' : {1,1,1,1}, {1,3}, {3,1}, {4}
```

Example 2:

```js
n : 5
Number of ways = 6
Explanation: Following are the six ways we can express 'n' : {1,1,1,1,1}, {1,1,3}, {1,3,1}, {3,1,1},{1,4}, {4,1}
```

Let’s first start with a recursive brute-force solution.

## Basic Solution

For every number ‘i’, we have three option: subtract either 1, 3, or 4 from ‘i’ and recursively process the remaining number. So our algorithm will look like:

```js
const countWays = function (n) {
    if (n == 0) {
        return 1;
    } // base case, we don't need to subtract any thing, so there is only one way

    if (n == 1) {
        return 1;
    } // we take subtract 1 to be left with zero, and that is the only way

    if (n == 2) {
        return 1;
    } // we can subtract 1 twice to get zero and that is the only way

    if (n == 3) {
        return 2;
    } // '3' can be expressed as {1,1,1}, {3}

    // if we subtract 1, we are left with 'n-1'
    const subtract1 = countWays(n - 1);
    // if we subtract 3, we are left with 'n-3'
    const subtract3 = countWays(n - 3);
    // if we subtract 4, we are left with 'n-4'
    const subtract4 = countWays(n - 4);

    return subtract1 + subtract3 + subtract4;
};

console.log(`Number of ways: ---> ${countWays(4)}`);
console.log(`Number of ways: ---> ${countWays(5)}`);
console.log(`Number of ways: ---> ${countWays(6)}`);
```

The time complexity of the above algorithm is exponential O(3^n). The space complexity is O(n) which is used to store the recursion stack.

Let’s visually draw the recursion for `countWays(5)` to see the overlapping subproblems:

We can clearly see the overlapping subproblem pattern: `countWays(3)`, `countWays(2)` and `countWays(1)` have been called twice. We can optimize this using memoization to store the results for

## Top-Down Dynamic Programming with Memoization

We can use an array to store the already solved subproblems. Here is the code:

```js
const countWays = function (n) {
    const dp = [];

    function countWaysRecursive(n) {
        if (n == 0) return 1; // base case, we don't need to subtract any thing, so there is only one way

        if (n == 1) return 1; // we can take subtract 1 to be left with zero, and that is the only way

        if (n == 2) return 1; // we can subtract 1 twice to get zero and that is the only way

        if (n == 3) return 2; // '3' can be expressed as {1,1,1}, {3}

        if (typeof dp[n] === 'undefined') {
            // if we subtract 1, we are left with 'n-1'
            const subtract1 = countWaysRecursive(n - 1);
            // if we subtract 3, we are left with 'n-3'
            const subtract3 = countWaysRecursive(n - 3);
            // if we subtract 4, we are left with 'n-4'
            const subtract4 = countWaysRecursive(n - 4);
            dp[n] = subtract1 + subtract3 + subtract4;
        }

        return dp[n];
    }
    return countWaysRecursive(n);
};

console.log(`Number of ways: ---> ${countWays(4)}`);
console.log(`Number of ways: ---> ${countWays(5)}`);
console.log(`Number of ways: ---> ${countWays(6)}`);
```

## Bottom-up Dynamic Programming

Let’s try to populate our `dp[]` array from the above solution, working in a bottom-up fashion. As we saw in the above code, every `countWaysRecursive(n)` is the sum of the three counts. We can use this fact to populate our array.

**Code:**

```js
const countWays = function (n) {
    const dp = Array(n + 1).fill(0);
    dp[0] = 1;
    dp[1] = 1;
    dp[2] = 1;
    dp[3] = 2;

    for (let i = 4; i <= n; i++) {
        dp[i] = dp[i - 1] + dp[i - 3] + dp[i - 4];
    }

    return dp[n];
};

console.log(`Number of ways: ---> ${countWays(4)}`);
console.log(`Number of ways: ---> ${countWays(5)}`);
console.log(`Number of ways: ---> ${countWays(6)}`);
```

The above solution has time and space complexity of O(n).
