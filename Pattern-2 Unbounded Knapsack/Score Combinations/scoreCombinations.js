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
