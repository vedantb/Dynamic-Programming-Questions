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
