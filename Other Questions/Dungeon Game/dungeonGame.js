/**
 * @param {number[][]} dungeon
 * @return {number}
 */
var calculateMinimumHP = function (dungeon) {
  let rows = dungeon.length;
  let cols = dungeon[0].length;

  let dp = Array(rows)
    .fill(Number.MAX_VALUE)
    .map(() => Array(cols).fill(Number.MAX_VALUE));

  let currCell, rightHealth, downHealth, nextHealth, minHealth;
  for (let i = rows - 1; i >= 0; i--) {
    for (let j = cols - 1; j >= 0; j--) {
      currCell = dungeon[i][j];

      rightHealth = j !== cols - 1 ? Math.max(1, dp[i][j + 1] - currCell) : Number.MAX_VALUE;
      downHealth = i !== rows - 1 ? Math.max(1, dp[i + 1][j] - currCell) : Number.MAX_VALUE;
      nextHealth = Math.min(rightHealth, downHealth);

      if (nextHealth !== Number.MAX_VALUE) {
        minHealth = nextHealth;
      } else {
        minHealth = currCell >= 0 ? 1 : 1 - currCell;
      }
      dp[i][j] = minHealth;
    }
  }
  return dp[0][0];
};

console.log(
  calculateMinimumHP([
    [-2, -3, 3],
    [-5, -10, 1],
    [10, 30, -5]
  ])
);
