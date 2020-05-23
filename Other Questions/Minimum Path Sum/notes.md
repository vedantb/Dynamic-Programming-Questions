## Minimum Path Sum

Given a m x n grid filled with non-negative numbers, find a path from top left to bottom right which minimizes the sum of all numbers along its path.

Note: You can only move either down or right at any point in time.

Example:

```js
Input:
[
  [1,3,1],
  [1,5,1],
  [4,2,1]
]
Output: 7
Explanation: Because the path 1→3→1→1→1 minimizes the sum.
```

## Optimized Solution

This is easy to do with a 2-dimenstional dp array. We can optimize it to a one-dimensional solution since we can only look at either the current element (for prev row) or the `j-1` left element.

**Code:**

```js
/**
 * @param {number[][]} grid
 * @return {number}
 */
var minPathSum = (grid) => {
  let dp = Array(grid[0].length);

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      if (i === 0 && j === 0) {
        dp[j] = grid[i][j];
      } else if (i === 0) {
        dp[j] = grid[i][j] + dp[j - 1];
      } else if (j === 0) {
        dp[j] = grid[i][j] + dp[j];
      } else {
        dp[j] = grid[i][j] + Math.min(dp[j - 1], dp[j]);
      }
    }
  }

  return dp[dp.length - 1];
};

let a = [
  [1, 3, 1],
  [1, 5, 1],
  [4, 2, 1]
];

console.log(`Minimum Path Sum is --> ${minPathSum(a)}`);
```
