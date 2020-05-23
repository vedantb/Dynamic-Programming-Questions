/**
 * @param {number[]} days
 * @param {number[]} costs
 * @return {number}
 */
var mincostTickets = (days, costs) => {
  let n = days.length;
  let daysIncluded = Array(days[n - 1] + 1);
  for (let i = 0; i < n; i++) {
    daysIncluded[days[i]] = true;
  }

  let minCost = Array(days[n - 1] + 1);
  minCost[0] = 0;

  for (let day = 1; day <= days[n - 1]; day++) {
    if (!daysIncluded[day]) {
      minCost[day] = minCost[day - 1];
      continue;
    }
    let min;
    min = minCost[day - 1] + costs[0];
    min = Math.min(min, (day < 7 ? 0 : minCost[day - 7]) + costs[1]);
    min = Math.min(min, (day < 30 ? 0 : minCost[day - 30]) + costs[2]);
    minCost[day] = min;
  }

  return minCost[days[n - 1]];
};

console.log(mincostTickets([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 30, 31], [2, 7, 15]));
console.log(mincostTickets([1, 4, 6, 7, 8, 20], [2, 7, 15]));
