## Last Stone Weight 2

We have a collection of rocks, each rock has a positive integer weight.

Each turn, we choose any two rocks and smash them together. Suppose the stones have weights x and y with x <= y. The result of this smash is:

If x == y, both stones are totally destroyed;
If x != y, the stone of weight x is totally destroyed, and the stone of weight y has new weight y-x.
At the end, there is at most 1 stone left. Return the smallest possible weight of this stone (the weight is 0 if there are no stones left.)

Example 1:

```js
Input: [2,7,4,1,8,1]
Output: 1
Explanation:
We can combine 2 and 4 to get 2 so the array converts to [2,7,1,8,1] then,
we can combine 7 and 8 to get 1 so the array converts to [2,1,1,1] then,
we can combine 2 and 1 to get 1 so the array converts to [1,1,1] then,
we can combine 1 and 1 to get 0 so the array converts to [1] then that's the optimal value.
```

## Solution

This problem is exactly the same as [Minimum Subset Sum Difference]('./../../../Pattern-1%20%200-1%20Knapsack%20Pattern/Minimum%20Subset%20Sum%20Difference/notes.md') . The questions finalls boils down to finding two subsets of stones from the given array such that their difference is the minimum and that will be the smallest possible weight of the remaining stone.

**Code:**

```js
/**
 * @param {number[]} stones
 * @return {number}
 */
var lastStoneWeightII = function (stones) {
  const n = stones.length;
  let sum = 0;
  for (let i = 0; i < n; i++) sum += stones[i];

  const requiredSum = Math.floor(sum / 2);

  const dp = Array(n)
    .fill(false)
    .map(() => Array(requiredSum + 1).fill(false));

  // populate the sum=0 columns, as we can always form '0' sum with an empty set
  for (let i = 0; i < n; i++) dp[i][0] = true;

  // with only one number, we can form a subset only when the required sum is equal to that number
  for (let s = 1; s <= requiredSum; s++) {
    dp[0][s] = stones[0] === s;
  }

  // prrocess all subsets for all sums
  for (let i = 1; i < n; i++) {
    for (let s = 1; s <= requiredSum; s++) {
      if (dp[i - 1][s]) {
        dp[i][s] = dp[i - 1][s];
      } else if (s >= stones[i]) {
        dp[i][s] = dp[i - 1][s - stones[i]];
      }
    }
  }

  let sum1 = 0;
  for (let i = requiredSum; i >= 0; i--) {
    if (dp[n - 1][i]) {
      sum1 = i;
      break;
    }
  }

  const sum2 = sum - sum1;
  return Math.abs(sum2 - sum1);
};
```
