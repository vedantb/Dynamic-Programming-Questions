## Maximal Square

Given a 2D binary matrix filled with 0's and 1's, find the largest square containing only 1's and return its area.

Example:

```js
Input:

1 0 1 0 0
1 0 1 1 1
1 1 1 1 1
1 0 0 1 0

Output: 4
```

## Solution

We create a m \* n dp array. As we iterate through the array, we're asking the question for every cell? what is the biggest square for which this cell is the bottom right corner. If the cell is 0, we don't consider anything. If the cell is 1, we check the 3 adjacent squares and add 1 to it if all of them are 1.

```js
/**
 * @param {character[][]} matrix
 * @return {number}
 */
var maximalSquare = function (arr) {
  let max = 0;
  let dp = Array(arr.length)
    .fill(0)
    .map(() => Array(arr[0].length).fill(0));

  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].length; j++) {
      if (i === 0 || j === 0) {
        dp[i][j] === '1' ? 1 : 0;
      } else if (arr[i][j] === '1') {
        dp[i][j] = 1 + Math.min(dp[i][j - 1], dp[i - 1][j], dp[i - 1][j - 1]);
      }
      if (dp[i][j] > max) max = dp[i][j];
    }
  }
  return max * max;
};
```
