## Perfect Squares

Given a positive integer n, find the least number of perfect square numbers (for example, 1, 4, 9, 16, ...) which sum to n.

Example 1:

```js
Input: n = 12;
Output: 3;
Explanation: 12 = 4 + 4 + 4;
```

Example 2:

```js
Input: n = 13;
Output: 2;
Explanation: 13 = 4 + 9;
```

## Dynamic Programming

We iterate from 1 to n, and for every number we calculate the solution till that number.

```js
/**
 * @param {number} n
 * @return {number}
 */
var numSquares = (n) => {
  const dp = Array(n + 1).fill(Number.MAX_VALUE);
  dp[0] = 0;

  // We only need to calculate squares till sqrt n
  let maxSquareIndex = Math.floor(Math.sqrt(n)) + 1;

  for (let i = 1; i <= n; i++) {
    for (let j = 1; j < maxSquareIndex; j++) {
      let squareNum = j * j;
      if (i < squareNum) break;
      dp[i] = Math.min(dp[i], dp[i - squareNum] + 1); // storing solution for every i
    }
  }
  return dp[n];
};

console.log(`Number of perfect squares summing up to 12 --> ${numSquares(12)}`);
console.log(`Number of perfect squares summing up to 12 --> ${numSquares(13)}`);
```

As a variant, we can also store the square numbers in an array and look that up instead of calculating it in every loop.
