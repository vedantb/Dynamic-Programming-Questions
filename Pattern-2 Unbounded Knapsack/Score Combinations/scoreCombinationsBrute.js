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
