## Problem Statement

Given a rod of length 'n', we are asked to cut the rod and sell the pieces in a way that will maximize the profit. We are also given the price of every piece of length 'i' where 1 <= i <= n

Example:

Lengths: {1, 2, 3, 4, 5}
Prices: {2, 6, 7, 10, 13}
Rod Length: 5

Let’s try different combinations of cutting the rod (list listed is not exhaustive):
Five pieces of length 1 => 10 price
Two pieces of length 2 and one piece of length 1 => 14 price
One piece of length 3 and two pieces of length 1 => 11 price
One piece of length 3 and one piece of length 2 => 13 price
One piece of length 4 and one piece of length 1 => 12 price
One piece of length 5 => 13 price

This shows that we get the maximum price (14) by cutting the rod into two pieces of length ‘2’ and one piece of length ‘1’.

## Basic Solution

This problem can be mapped to the unbounded Knapsack pattern. The weights array of the unbounded knapsack problem is equivalent to the lengths array and profits is equivalent to prices.

A basic brute-force solution could be to try all combinations of the given rod lengths to choose the one with the maximum sale price. This is what our algorithm will look like:

```js
for each rod length 'i'
  create a new set which includes one quantity of length 'i', and recursively process all rod lengths for the remaining length

  create a new set without rod length 'i', and recursively process for remaining rod lengths
return the set from the above two sets with a higher sales price
```

Since this problem is quite similar to Unbounded Knapsack, let’s jump directly to the bottom-up dynamic solution.

## Bottom-up Dynamic Programming

Let's try to poopulate our `dp[][]` array in a bottom-up fashion. Essentially, what we want to achieve is: "find the maximum sales prices for every rod length and every possible sales price"

So for every possible rod length ‘len’ (0 <= len <= n), we have two options:

1. Exclude the piece. In this case, we will take whatever price we get from the rod length excluding this piece => `dp[index-1][len]`
2. Include the piece if its length is not more than ‘len’. In this case, we include its price plus whatever price we get from the remaining rod length => `prices[index] + dp[index]len-lengths[index]]`

Finally, we have to take the maximum of the above two values:
`dp[index][len] = max (dp[index-1][len], prices[index] + dp[index][len-lengths[index]])`

```js
let solveRodCutting = (lengths, prices, n) => {
    // base checks
    if (n <= 0 || prices.length === 0 || prices.length !== lengths.length) return 0;

    const lengthCount = lengths.length;
    const dp = Array(lengthCount)
        .fill(0)
        .map(() => Array(n + 1).fill(0));

    // capacity 0 columns are already initialized with 0 when we initialized the table

    for (let i = 0; i < lengthCount; i++) {
        for (let len = 1; len <= n; len++) {
            let profit1 = 0;
            let profit2 = 0;
            if (lengths[i] <= len) profit1 = prices[i] + dp[i][len - lengths[i]];
            if (i > 0) profit2 = dp[i - 1][len];

            dp[i][len] = Math.max(profit1, profit2);
        }
    }

    return dp[lengthCount - 1][n];
};

const lengths = [1, 2, 3, 4, 5];
const prices = [2, 6, 7, 10, 13];
console.log(`Maximum profit: ---> ${solveRodCutting(lengths, prices, 5)}`);
```

The above solution has time and space complexity of `O(N*C)`, where ‘N’ represents total items and ‘C’ is the maximum capacity.
