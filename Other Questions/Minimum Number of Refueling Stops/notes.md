## Minimum Number of Refueling Stops

https://leetcode.com/problems/minimum-number-of-refueling-stops/

A car travels from a starting position to a destination which is target miles east of the starting position.

Along the way, there are gas stations. Each station[i] represents a gas station that is station[i][0] miles east of the starting position, and has station[i][1] liters of gas.

The car starts with an infinite tank of gas, which initially has startFuel liters of fuel in it. It uses 1 liter of gas per 1 mile that it drives.

When the car reaches a gas station, it may stop and refuel, transferring all the gas from the station into the car.

What is the least number of refueling stops the car must make in order to reach its destination? If it cannot reach the destination, return -1.

Note that if the car reaches a gas station with 0 fuel left, the car can still refuel there. If the car reaches the destination with 0 fuel left, it is still considered to have arrived.

Example 1:

```js
Input: target = 1, startFuel = 1, stations = []
Output: 0
Explanation: We can reach the target without refueling.
```

Example 2:

```js
Input: target = 100, startFuel = 1, stations = [[10,100]]
Output: -1
Explanation: We can't reach the target (or even the first gas station).
```

Example 3:

```js
Input: target = 100, startFuel = 10, stations = [[10,60],[20,30],[30,30],[60,40]]
Output: 2
Explanation:
We start with 10 liters of fuel.
We drive to position 10, expending 10 liters of fuel.  We refuel from 0 liters to 60 liters of gas.
Then, we drive from position 10 to position 60 (expending 50 liters of fuel),
and refuel from 10 liters to 50 liters of gas.  We then drive to and reach the target.
We made 2 refueling stops along the way, so we return 2.
```

## Solution

We use a `dp[i]` to be the farthest location we can get to using `i` fueling stops.
We initialize `dp[0]` as `startFuel` since we can just get to a distance of `startFuel` with no stops.

When iterating over the stations, if we can reach the station, we update the maximum distance we can reach for that amount of stations and we also backtrack to see if we need to update previous indexes to see if we can move further using this station's fuel instead of the previous station.

```js
/**
 * @param {number} target
 * @param {number} startFuel
 * @param {number[][]} stations
 * @return {number}
 */
var minRefuelStops = function (target, startFuel, stations) {
  let n = stations.length;
  let dp = Array(n + 1).fill(0);
  dp[0] = startFuel;

  for (let i = 0; i < n; i++) {
    for (let t = i; t >= 0; t--) {
      // if we can reach the current station, we update the dp tables with the max possible distance we can reach
      if (dp[t] >= stations[i][0]) {
        dp[t + 1] = Math.max(dp[t + 1], dp[t] + stations[i][1]);
      }
    }
  }

  for (let i = 0; i <= n; i++) {
    if (dp[i] >= target) return i;
  }
  return -1;
};
```
