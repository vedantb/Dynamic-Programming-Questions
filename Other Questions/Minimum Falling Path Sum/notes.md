## Minimum Falling Path Sum

Given a square array of integers A, we want the minimum sum of a falling path through A.

A falling path starts at any element in the first row, and chooses one element from each row. The next row's choice must be in a column that is different from the previous row's column by at most one.

Example 1:

```js
Input: [[1,2,3],[4,5,6],[7,8,9]]
Output: 12
Explanation:
The possible falling paths are:
[1,4,7], [1,4,8], [1,5,7], [1,5,8], [1,5,9]
[2,4,7], [2,4,8], [2,5,7], [2,5,8], [2,5,9], [2,6,8], [2,6,9]
[3,5,7], [3,5,8], [3,5,9], [3,6,8], [3,6,9]

The falling path with the smallest sum is [1,4,7], so the answer is 12.
```

## Solution

We can solve this using a one-dimensional array as a dp cache. We start from the 2nd row (index 1), and for every element we calculate the minimum possible path to reach that element. So for every element `i`, the minimum cost is:
`min (dp[i-1][j-1], dp[i-1][j], dp[i-1][j+1])`
We need to be careful that if any of these are out of bounds, we should not consider them.

As seen in the code, we're mainintaing a temp array(cache) for each row and once filled we're replacing the dp with the temp row. since we only need the values of the previous row at any time.

Once, we reach the final row, we iterate over the dp array and pick the answer with the minimum sum.

```js
/**
 * @param {number[][]} A
 * @return {number}
 */
var minFallingPathSum = (A) => {
  let dp = A[0];
  let minValue = Number.MAX_VALUE;

  for (let i = 1; i < A.length; i++) {
    let temp = [];
    for (let j = 0; j < A[0].length; j++) {
      if (j === 0) {
        temp[j] = A[i][j] + Math.min(dp[j], dp[j + 1] || Number.MAX_VALUE);
      } else {
        temp[j] = A[i][j] + Math.min(dp[j - 1], dp[j], dp[j + 1] || Number.MAX_VALUE);
      }
    }
    dp = temp;
  }

  for (let i = 0; i < dp.length; i++) {
    minValue = Math.min(minValue, dp[i]);
  }

  return minValue;
};

/** Tests **/
console.log(
  minFallingPathSum([
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
  ])
);

console.log(minFallingPathSum([[69]]));

console.log(
  minFallingPathSum([
    [-19, 57],
    [-40, -5]
  ])
);
```
