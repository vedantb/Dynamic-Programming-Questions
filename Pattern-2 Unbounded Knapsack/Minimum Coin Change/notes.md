## Introduction

Given an infinite supply of ‘n’ coin denominations and a total money amount, we are asked to find the minimum number of coins needed to make up that amount.

Example 1:

```js
Denominations: {1,2,3}
Total amount: 5
Output: 2
Explanation: We need minimum of two coins {2,3} to make a total of '5'
```

Example 2:

```js
Denominations: {1,2,3}
Total amount: 11
Output: 4
Explanation: We need minimum four coins {2,3,3,3} to make a total of '11'
```

## Problem Statement

Given a number array to represent different coin denominations and a total amount ‘T’, we need to find the minimum number of coins needed to make change for ‘T’. We can assume an infinite supply of coins, therefore, each coin can be chosen multiple times.

This problem follows the Unbounded Knapsack pattern.

## Basic Solution

A basic brute-force solution could be to try all combinations of the given coins to select the ones that give a total sum of ‘T’. This is what our algorithm will look like:

```js
for each coin 'c'
  create a new set which includes one quantity of coin 'c' if it does not exceed 'T', and
     recursively call to process all coins
  create a new set without coin 'c', and recursively call to process the remaining coins
return the count of coins from the above two sets with a smaller number of coins
```

**Code:**

```js
let countChange = (denominations, total) => {
    let coinChangeHelper = (denominations, total, currentIndex) => {
        // base check
        if (total === 0) return 0;

        if (denominations.length === 0 || currentIndex >= denominations.length) return Number.MAX_VALUE;

        // recursive call after selecting the coin at the currentIndex
        //  if the coin at the currentIndex exceeds the total, we shouldn't process this
        let count1 = Number.MAX_VALUE;
        if (denominations[currentIndex] <= total) {
            const res = coinChangeHelper(denominations, total - denominations[currentIndex], currentIndex);
            if (res !== Number.MAX_VALUE) count1 = res + 1;
        }

        const count2 = coinChangeHelper(denominations, total, currentIndex + 1);

        return Math.min(count1, count2);
    };

    const result = coinChangeHelper(denominations, total, 0);
    return result === Number.MAX_VALUE ? -1 : result;
};

console.log(`Number of ways to make change: ---> ${countChange([1, 2, 3], 5)}`);
console.log(`Number of ways to make change: ---> ${countChange([1, 2, 3], 11)}`);
console.log(`Number of ways to make change: ---> ${countChange([1, 2, 3], 7)}`);
console.log(`Number of ways to make change: ---> ${countChange([3, 5], 7)}`);
```

The time complexity of the above algorithm is exponential `O(2^{C+T})`, where ‘C’ represents total coin denominations and ‘T’ is the total amount that we want to make change. The space complexity will be `O(C+T)`.

Let’s try to find a better solution.

## Top-down Dynamic Programming with Memoization

We can use memoization to overcome the overlapping sub-problems. We will be using a two-dimensional array to store the results of solved sub-problems. As mentioned above, we need to store results for every coin combination and for every possible sum:

```js
let countChange = (denominations, total) => {
    const dp = [];
    let coinChangeHelper = (denominations, total, currentIndex) => {
        // base check
        if (total === 0) return 0;

        if (denominations.length === 0 || currentIndex >= denominations.length) return Number.MAX_VALUE;

        dp[currentIndex] = dp[currentIndex] || [];

        if (typeof dp[currentIndex][total] !== 'undefined') return dp[currentIndex][total];

        // recursive call after selecting the coin at the currentIndex
        //  if the coin at the currentIndex exceeds the total, we shouldn't process this
        let count1 = Number.MAX_VALUE;
        if (denominations[currentIndex] <= total) {
            const res = coinChangeHelper(denominations, total - denominations[currentIndex], currentIndex);
            if (res !== Number.MAX_VALUE) count1 = res + 1;
        }

        const count2 = coinChangeHelper(denominations, total, currentIndex + 1);

        dp[currentIndex][total] = Math.min(count1, count2);
        return dp[currentIndex][total];
    };

    const result = coinChangeHelper(denominations, total, 0);
    return result === Number.MAX_VALUE ? -1 : result;
};

console.log(`Number of ways to make change: ---> ${countChange([1, 2, 3], 5)}`);
console.log(`Number of ways to make change: ---> ${countChange([1, 2, 3], 11)}`);
console.log(`Number of ways to make change: ---> ${countChange([1, 2, 3], 7)}`);
console.log(`Number of ways to make change: ---> ${countChange([3, 5], 7)}`);
```

## Bottom-up Dynamic Programming

Let’s try to populate our array `dp[TotalDenominations][total+1]` for every possible total with a minimum number of coins needed.

So for every possible total ‘t’ (0<= t <= Total) and for every possible coin index (0 <= index < denominations.length), we have two options:

1. Exclude the coin: In this case, we will take the minimum coin count from the previous set => dp[index-1][t]
2. Include the coin if its value is not more than ‘t’: In this case, we will take the minimum count needed to get the remaining total, plus include ‘1’ for the current coin => `dp[index][t-denominations[index]] + 1`

Finally, we will take the minimum of the above two values for our solution:
`dp[index][t] = min(dp[index-1][t], dp[index][t-denominations[index]] + 1)`

Let’s draw this visually with the following example:

```js
Denominations: [1, 2, 3];
Total: 7;
```

We don't need any coin to make zero total:

![alt text](https://imgur.com/cRNgJkG.png 'Min Coin Change')

Index: 0 => `dp[index][total - denominations[index]] + 1`. We don't consider `dp[index-1][total]` as index = 0

![alt text](https://imgur.com/3ItVC0P.png 'Min Coin Change')

`min( dp[Index-1][Total], dp[Index][Total-denominations[Index] + 1)`

![alt text](https://imgur.com/9p4i2VX.png 'Min Coin Change')

**Code:**

```js
let countChange = (denominations, total) => {
    const n = denominations.length;
    const dp = Array(denominations.length)
        .fill(0)
        .map(() => Array(total + 1).fill(Number.MAX_VALUE));

    // populate the total=0 columns, as we don't need any coin to make zero total
    for (let i = 0; i < n; i++) dp[i][0] = 0;

    for (let i = 0; i < n; i++) {
        for (let t = 1; t <= total; t++) {
            if (i > 0) {
                // exclude the coin
                dp[i][t] = dp[i - 1][t];
            }
            if (t >= denominations[i]) {
                // include the coin
                dp[i][t] = Math.min(dp[i][t], dp[i][t - denominations[i]] + 1);
            }
        }
    }

    // total combinations will be at the bottom-right corner.
    return dp[n - 1][total] === Number.MAX_VALUE ? -1 : dp[n - 1][total];
};

console.log(`Number of ways to make change: ---> ${countChange([1, 2, 3], 5)}`);
console.log(`Number of ways to make change: ---> ${countChange([1, 2, 3], 11)}`);
console.log(`Number of ways to make change: ---> ${countChange([1, 2, 3], 7)}`);
console.log(`Number of ways to make change: ---> ${countChange([3, 5], 7)}`);
```

The above solution has time and space complexity of `O(C*T)`, where ‘C’ represents total coin denominations and ‘T’ is the total amount that we want to make change.
