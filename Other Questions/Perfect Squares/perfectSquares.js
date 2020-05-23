/**
 * @param {number} n
 * @return {number}
 */
var numSquares = (n) => {
  const dp = Array(n + 1).fill(Number.MAX_VALUE);
  dp[0] = 0;
  let maxSquareIndex = Math.floor(Math.sqrt(n)) + 1;

  for (let i = 1; i <= n; i++) {
    for (let j = 1; j < maxSquareIndex; j++) {
      let squareNum = j * j;
      if (i < squareNum) break;
      dp[i] = Math.min(dp[i], dp[i - squareNum] + 1);
    }
  }
  return dp[n];
};

console.log(`Number of perfect squares summing up to 12 --> ${numSquares(12)}`);
console.log(`Number of perfect squares summing up to 12 --> ${numSquares(13)}`);
