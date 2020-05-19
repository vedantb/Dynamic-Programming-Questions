## Introduction

Given an infinite supply of ‘n’ coin denominations and a total money amount, we are asked to find the total number of distinct ways to make up that amount.

Example:

```code
Denominations: {1,2,3}
Total amount: 5
Output: 5

Explanation: There are five ways to make the change for '5', here are those ways:
1. {1,1,1,1,1}
2. {1,1,1,2}
3. {1,2,2}
4. {1,1,3}
5. {2,3}
```

## Problem Statement

Given a number array to represent different coin denominations and a total amount T, we need to find all the different ways to make change for T with the given denominations. We can assume an infinite supply of coins, therefore, each coin can be used multiple times.

This follows the unbounded knapsack pattern.

## Basic Solution

A basic brute-force solution could be to try all combinations of the given coins to select the ones that give a total sum of ‘T’. This is what our algorithm will look like:

```js
for each coin 'c'
  create a new set which includes one quantity of coin 'c' if it does not exceed 'T', and
     recursively call to process all coins
  create a new set without coin 'c', and recursively call to process the remaining coins
return the count of sets who have a sum equal to 'T'
```

This problem is quite similar to Count of Subset Sum. The only difference here is that after including the item i.e. coin, we recursively call to process all items (including the current coin). In 'Count of Subset Sum', however, we were recursively calling to process only remaining items.

Code:

```js
let countChange = (denominations, total) => {
    let countChangeHelper = (denominations, total, currentIndex) => {
        // base checks
        if (total === 0) return 1;

        if (denominations.length === 0 || currentIndex >= denominations.length) return 0;

        //recursively call after selecting the coin at currentIndex
        // if the coin at currentIndex exceeds the total, we shouldn't process this
        let sum1 = 0;
        if (denominations[currentIndex] <= total) {
            sum1 = countChangeHelper(denominations, total - denominations[currentIndex], currentIndex);
        }

        // recursively call after excluding the coin at currentIndex
        const sum2 = countChangeHelper(denominations, total, currentIndex + 1);

        return sum1 + sum2;
    };
    return countChangeHelper(denominations, total, 0);
};

console.log(`Number of ways to make change: ---> ${countChange([1, 2, 3], 5)}`);
```

The time complexity of the above algorithm is exponential `O(2^{C+T})`, where ‘C’ represents total coin denominations and ‘T’ is the total amount that we want to make change. The space complexity will be `O(C+T)`.

Let’s try to find a better solution.

## Top-down Dynamic Programming with Memoization

We can use memoization to overcome the overlapping sub-problems. We will be using a two-dimensional array to store the results of solved sub-problems. As mentioned above, we need to store results for every coin combination and for every possible sum:

```js
let countChange = (denominations, total) => {
    const dp = [];

    let countChangeHelper = (denominations, total, currentIndex) => {
        // base checks
        if (total === 0) return 1;

        if (denominations.length === 0 || currentIndex >= denominations.length) return 0;

        dp[currentIndex] = dp[currentIndex] || [];

        // if we have already processed a similar sub-problem, return the result from memory
        if (typeof dp[currentIndex][total] !== 'undefined') return dp[currentIndex][total];

        //recursively call after selecting the coin at currentIndex
        // if the coin at currentIndex exceeds the total, we shouldn't process this
        let sum1 = 0;
        if (denominations[currentIndex] <= total) {
            sum1 = countChangeHelper(denominations, total - denominations[currentIndex], currentIndex);
        }

        // recursively call after excluding the coin at currentIndex
        const sum2 = countChangeHelper(denominations, total, currentIndex + 1);

        dp[currentIndex][total] = sum1 + sum2;
        return dp[currentIndex][total];
    };
    return countChangeHelper(denominations, total, 0);
};

console.log(`Number of ways to make change: ---> ${countChange([1, 2, 3], 5)}`);
```

## Bottom-Up Dynamic Programming

We will try to find if we can make all possible sums, with every combination of coins, to populate the array `dp[TotalDenominations][total+1]`.

So for every possible total ‘t’ (0<= t <= Total) and for every possible coin index (0 <= index < denominations.length), we have two options:

1. Exclude the coin. Count all the coin combinations without the given coin up to the total 't' => `dp[index-1][t]`
2. Include the coin if its value is not more than ‘t’. In this case, we will count all the coin combinations to get the remaining total: `dp[index][t-denominations[index]]`

Finally, to find the total combinations, we will add both the above two values:
`dp[index][t] = dp[index-1][t] + dp[index][t-denominations[index]]`

Let’s draw this visually with the following example:

```
Denominations: [1, 2, 3]
Total: 5
```

'0' total can always be found through an empty set:

![alt text](https://imgur.com/uDfWjAR.png 'Coin Change')

index: 0 => `dp[index][total - denominations[index]]`. We don't consider `dp[index-1][total]` for index 0

![alt text](https://imgur.com/Lw0AygI.png 'Coin Change')

`dp[index-1][total] + dp[index][total - denominations[index]`

![alt text](https://imgur.com/9hrkyb3.png 'Coin Change')

**Code:**

```js
let countChange = (denominations, total) => {
    const n = denominations.length;
    const dp = Array(denominations.length)
        .fill(0)
        .map(() => Array(total + 1).fill(0));

    // populate the total=0 columns, as we always have an empty set for 0 total
    for (let i = 0; i < n; i++) dp[i][0] = 1;

    // process all subarrays
    for (let i = 0; i < n; i++) {
        for (let t = 1; t <= total; t++) {
            if (i > 0) dp[i][t] = dp[i - 1][t];
            if (t >= denominations[i]) dp[i][t] += dp[i][t - denominations[i]];
        }
    }

    // total combinations will be at the bottom-right corner.
    return dp[n - 1][total];
};

console.log(`Number of ways to make change: ---> ${countChange([1, 2, 3], 5)}`);
```

The above solution has time and space complexity of `O(C*T)`, where ‘C’ represents total coin denominations and ‘T’ is the total amount that we want to make change.
