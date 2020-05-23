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
