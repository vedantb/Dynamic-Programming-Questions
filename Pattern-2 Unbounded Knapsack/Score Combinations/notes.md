## Score Combinations

## Problem Statement

Given an array scoreEvents of possible score point amounts in a sports match and an integer amount finalScore (the final score of the game), return the total of possible unique score event arrangements that would result in the value of finalScore.

Example 1:

```js
Input:
scoreEvents = [2,3,7]
finalScore = 12

Output: 4
Explanation:
There are 4 possible ways that the game ended with a final score of 12:
1.) [2, 2, 2, 2, 2, 2]
2.) [3, 3, 3, 3]
3.) [2, 2, 2, 3, 3]
4.) [2, 3, 7]
```

Example 2:

```js
Input:
scoreEvents = [2,4,5]
finalScore = 9

Output: 2
Explanation:
There are 2 possible ways that the game ended with a final score of 9:
1.) [2, 2, 5]
2.) [4, 5]
```

Example 3:

```js
Input: scoreEvents = [4, 5];
finalScore = 11;

Output: 0;
```

### Basic Solution

A basic brute-force solution could be to try all combinations of the given scores to select the ones that give a final score. This is what our algorithm will look like:

```js
for each scoreEvent 's'
    create a new set which includes the score from scoreEvent if it does not exceed the final score, and recursively call to process all scoreEvents
    create a new set without the score 's', and recursively call to process the remaining scores.
```

This problem is exactly the same as Coin Change problem.

**Code:**

```js
const totalWaysToReachScore = (pointEvents, finalScore) => {
  let totalWaysToReachScoreHelper = (pointEvents, finalScore, currentIndex) => {
    // base checks
    if (finalScore === 0) return 1;

    if (pointEvents.length === 0 || currentIndex >= pointEvents.length) return 0;

    let sum1 = 0;
    if (pointEvents[currentIndex] <= finalScore) {
      sum1 = totalWaysToReachScoreHelper(pointEvents, finalScore - pointEvents[currentIndex], currentIndex);
    }

    const sum2 = totalWaysToReachScoreHelper(pointEvents, finalScore, currentIndex + 1);

    return sum1 + sum2;
  };

  return totalWaysToReachScoreHelper(pointEvents, finalScore, 0);
};

console.log(`Number of ways to reach score: ---> ${totalWaysToReachScore([2, 3, 7], 12)}`);
console.log(`Number of ways to reach score: ---> ${totalWaysToReachScore([2, 4, 5], 9)}`);
console.log(`Number of ways to reach score: ---> ${totalWaysToReachScore([4, 5], 11)}`);
```

The time complexity of the above algorithm is `O(2^{S+F})` where 'S' represents the total pointEvents/scores, and 'F" is the final score. The space complexity is `O(S+F)`

## Top-down Dynamic Programming with Memoization

We can use memoization to overcome the overlapping sub-problems. We will be using a two-dimensional array to store the results of solved sub-problems. As mentioned above, we need to store results for every coin combination and for every possible sum:

```js
const totalWaysToReachScore = (pointEvents, finalScore) => {
  const dp = [];
  let totalWaysToReachScoreHelper = (pointEvents, finalScore, currentIndex) => {
    // base checks
    if (finalScore === 0) return 1;

    if (pointEvents.length === 0 || currentIndex >= pointEvents.length) return 0;

    dp[currentIndex] = dp[currentIndex] || [];

    if (finalScore in dp[currentIndex]) return dp[currentIndex][finalScore];

    let sum1 = 0;
    if (pointEvents[currentIndex] <= finalScore) {
      sum1 = totalWaysToReachScoreHelper(pointEvents, finalScore - pointEvents[currentIndex], currentIndex);
    }

    const sum2 = totalWaysToReachScoreHelper(pointEvents, finalScore, currentIndex + 1);

    dp[currentIndex][finalScore] = sum1 + sum2;
    return dp[currentIndex][finalScore];
  };

  return totalWaysToReachScoreHelper(pointEvents, finalScore, 0);
};

console.log(`Number of ways to reach score: ---> ${totalWaysToReachScore([2, 3, 7], 12)}`);
console.log(`Number of ways to reach score: ---> ${totalWaysToReachScore([2, 4, 5], 9)}`);
console.log(`Number of ways to reach score: ---> ${totalWaysToReachScore([4, 5], 11)}`);
```

## Bottom-up Dynamic Programming

```js
/**
 * @param {number} finalScore
 * @param {Array<number>} pointEvents
 * @return {number}
 */
const totalWaysToReachScore = (finalScore, pointEvents) => {
  const n = pointEvents.length;
  const dp = Array(n)
    .fill(0)
    .map(() => Array(finalScore + 1).fill(0));

  // There are no ways to make any combinations for any score having no point events
  for (let col = 0; col <= finalScore; col++) {
    dp[0][col] = 0;
  }

  // There is 1 way to reach score 0 given any amount of items, to not score at all
  for (let row = 0; row <= pointEvents.length; row++) {
    dp[row][0] = 1;
  }

  for (let row = 0; row < pointEvents.length; row++) {
    for (let score = 1; score <= finalScore; score++) {
      const eventValue = pointEvents[row];

      // don't use this score. So it's same as the the previous row
      const withoutThisScore = row > 0 ? dp[row - 1][score] : 0;

      // we use this event value if it's value is less than the score
      let withThisScore = 0;
      if (eventValue <= score) {
        withThisScore = dp[row][score - eventValue];
      }

      dp[row][scoore] = withoutThisScore + withThisScore;
    }
  }

  return dp[n - 1][finalScore];
};
```
