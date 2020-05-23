## Dungeon Game

https://leetcode.com/problems/dungeon-game/

The demons had captured the princess (P) and imprisoned her in the bottom-right corner of a dungeon. The dungeon consists of M x N rooms laid out in a 2D grid. Our valiant knight (K) was initially positioned in the top-left room and must fight his way through the dungeon to rescue the princess.

The knight has an initial health point represented by a positive integer. If at any point his health point drops to 0 or below, he dies immediately.

Some of the rooms are guarded by demons, so the knight loses health (negative integers) upon entering these rooms; other rooms are either empty (0's) or contain magic orbs that increase the knight's health (positive integers).

In order to reach the princess as quickly as possible, the knight decides to move only rightward or downward in each step.

**Write a function to determine the knight's minimum initial health so that he is able to rescue the princess.**

## Solution

Though the down-right is the destination, we can start from there and work backwards the minimal health the knight needs at each stop.

Let's take an example:

```js
[
  [-2, -3, 3],
  [-5, -10, 1],
  [10, 30, -5]
];
```

At the bottom right corner, we need at least 6 health points to survive.
If we take one step back, we could reach the final step from either the cell above or cell to the left.

Let's look at the cell above (1,2). We know that the knight should at least have 6 HP when reaching the destination. Since at this location we increase the HP by 1, the knight just needs to possess 5 HP to when arriving at this cell to reach the destination safely.

Another alternative to reach the destination is is the cell on the left (2,1). Here the knight would gain 30 health. So, the knight can enter with just 1 HP and still survive and reach the destination.

Let's do this exercise for one more step further from the destination. Let's look at the cell (1,1).

Following the same logic, we could obtain two values for this cell, which represent the minimum health points the knight would need for each of the directions that he takes. As we see, the knight would need at least 15 HP to move to the right and reach the destination. We get that by `max(dp[i][j+1] - dungeon[i][j], 1)`. If we go down from this cell, the knight would just need 11 HP. We get that from `max(dp[i+1][j] - dungeon[i][j], 1)`.

**Code:**

```js
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
```
