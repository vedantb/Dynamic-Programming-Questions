## Min Cost Climbing Stairs

On a staircase, the i-th step has some non-negative cost `cost[i]` assigned (0 indexed).

Once you pay the cost, you can either climb one or two steps. You need to find minimum cost to reach the top of the floor, and you can either start from the step with index 0, or the step with index 1.

Example 1:

```js
Input: cost = [10, 15, 20]
Output: 15
Explanation: Cheapest is start on cost[1], pay that cost and go to the top.
```

Example 2:

```js
Input: cost = [1, 100, 1, 1, 1, 100, 1, 1, 100, 1]
Output: 6
Explanation: Cheapest is start on cost[0], and only step on 1s, skipping cost[3].
```

**Code:**

```js
/**
 * @param {number[]} cost
 * @return {number}
 */
var minCostClimbingStairs = (cost) => {
  let cost1 = cost[0];
  let cost2 = cost[1];

  for (let i = 2; i < cost.length; i++) {
    // cost to reach the step: cost of current step + cost of 1 step away or cost of 2 steps away
    let currentCost = cost[i] + Math.min(cost1, cost2);
    cost1 = cost2;
    cost2 = currentCost;
  }
  return Math.min(cost1, cost2);
};
```
