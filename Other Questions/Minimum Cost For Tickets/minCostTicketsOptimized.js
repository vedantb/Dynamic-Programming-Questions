/**
 * @param {number[]} days
 * @param {number[]} costs
 * @return {number}
 */
var mincostTickets = function (days, costs, minCost = 0) {
  let last7 = [];
  let last30 = [];
  let minCost = 0;
  for (let day of days) {
    // if the last7 array has an element with a day which is already past 7 days, we remove it
    while (last7.length > 0 && last7[0][0] + 7 <= day) last7.shift();
    // if the last30 array has an element with a day which is already past 30 days, we remove it
    while (last30.length > 0 && last30[0][0] + 30 <= day) last30.shift();

    // we keep track of the last 7 days in the last7 array, so we always push
    last7.push([day, minCost + costs[1]]);
    // we keep track of the last 30 days in the last7 array, so we always push
    last30.push([day, minCost + costs[2]]);
    // the min cost is the minCost calculated till now (prev day) + cost of 1 day.
    // or the earliest possible time to buy 7 day or 30 day
    minCost = Math.min(minCost + costs[0], last7[0] && last7[0][1], last30[0] && last30[0][1]);
  }
  return minCost;
};
