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
