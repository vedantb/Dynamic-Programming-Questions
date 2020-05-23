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
