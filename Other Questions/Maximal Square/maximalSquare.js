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
