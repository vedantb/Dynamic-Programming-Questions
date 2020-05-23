## Minimum Cost for Train Tickets

### Problem Statement

In a country popular for train travel, you have planned some train travelling one year in advance. The days of the year that you will travel is given as an array days. Each day is an integer from 1 to 365.

Train tickets are sold in 3 different ways:

- a 1-day pass is sold for `costs[0]` dollars;
- a 7-day pass is sold for `costs[1]` dollars;
- a 30-day pass is sold for `costs[2]` dollars.

The passes allow that many days of consecutive travel. For example, if we get a 7-day pass on day 2, then we can travel for 7 days: day 2, 3, 4, 5, 6, 7, and 8.

Return the minimum number of dollars you need to travel every day in the given list of days.

Example 1:

```js
Input: days = [1,4,6,7,8,20], costs = [2,7,15]
Output: 11
Explanation:
For example, here is one way to buy passes that lets you travel your travel plan:
On day 1, you bought a 1-day pass for costs[0] = $2, which covered day 1.
On day 3, you bought a 7-day pass for costs[1] = $7, which covered days 3, 4, ..., 9.
On day 20, you bought a 1-day pass for costs[0] = $2, which covered day 20.
In total you spent $11 and covered all the days of your travel.
```

Example 2:

```js
Input: days = [1,2,3,4,5,6,7,8,9,10,30,31], costs = [2,7,15]
Output: 17
Explanation:
For example, here is one way to buy passes that lets you travel your travel plan:
On day 1, you bought a 30-day pass for costs[2] = $15 which covered days 1, 2, ..., 30.
On day 31, you bought a 1-day pass for costs[0] = $2 which covered day 31.
In total you spent $17 and covered all the days of your travel.
```

## Basic Solution

For every day, we have 3 options: get the 1 day ticket, 7 day ticket or 30 day ticket. We try all options and recursively process the remaining elements. If we buy a 7 or 30 day ticket, we will not be buying another ticket for the next 7 or 30 days respectively, which is what `daysCovered` checks for.

```js
/**
 * @param {number[]} days
 * @param {number[]} costs
 * @return {number}
 */
var mincostTickets = (days, costs) => {
  const dp = [];
  let minCostTicketsHelper = (days, costs, currentIndex, daysCovered) => {
    if (currentIndex === days.length) return 0;
    if (daysCovered > days[days.length - 1]) return 0;

    dp[currentIndex] = dp[currentIndex] || [];

    if (daysCovered in dp[currentIndex]) return dp[currentIndex][daysCovered];

    let minSum = 0;
    if (days[currentIndex] > daysCovered) {
      let s0 = costs[0] + minCostTicketsHelper(days, costs, currentIndex + 1, daysCovered + 1);
      let s1 = costs[1] + minCostTicketsHelper(days, costs, currentIndex + 1, daysCovered + 7);
      let s2 = costs[2] + minCostTicketsHelper(days, costs, currentIndex + 1, daysCovered + 30);
      minSum = Math.min(s0, s1, s2);
    } else {
      let s0 = minCostTicketsHelper(days, costs, currentIndex + 1, daysCovered);
      minSum = s0;
    }

    dp[currentIndex][daysCovered] = minSum;
    return dp[currentIndex][daysCovered];
  };

  return minCostTicketsHelper(days, costs, 0, 0);
};

console.log(mincostTickets([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 30, 31], [2, 7, 15]));
```

## Dynamic Programming

If we're not travelling on a day, it's strictly better to not buy a ticket on that day. So, we iterate through the max number of days, and if we're at a day we're not travelling, the `minCost` for travelling on that day is the same as `minCost` for `day-1`.

If we're travelling on that day, we can calculate the mincost as:
`min ( minCost + cost of 1 day, minCost of day-7 + cost of 7 day, minCost of day-30 + cost of 30 day)`

```js
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
```
