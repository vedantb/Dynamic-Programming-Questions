let canPartitionTopDown = function (num) {
    let sum = 0;
    for (let i = 0; i < num.length; i++) sum += num[i];

    // if sum is an odd number we can't have two subsets with equal sum
    if (sum % 2 !== 0) return false;

    const dp = [];

    let canPartitionTopDownHelper = function (sum, currentIndex) {
        // base check
        if (sum === 0) return true;

        if (num.length === 0 || currentIndex >= num.length) return false;

        dp[currentIndex] = dp[currentIndex] || [];

        if (dp[currentIndex][sum]) return dp[currentIndex][sum];

        // recursive call after choosing the number at the currentIndex
        // if the number at currentIndex exceeds the sum, we shouldn't process this
        if (num[currentIndex] <= sum) {
            if (canPartitionTopDownHelper(sum - num[currentIndex], currentIndex + 1)) {
                dp[currentIndex][sum] = true;
                return true;
            }
        }

        // recursive call after excluding the number at the currentIndex
        dp[currentIndex][sum] = canPartitionTopDownHelper(sum, currentIndex + 1);
        return dp[currentIndex][sum];
    };

    return canPartitionTopDownHelper(sum / 2, 0);
};

console.log(`Can partitioning be done: ---> ${canPartitionTopDown([1, 2, 3, 4])}`);
console.log(`Can partitioning be done: ---> ${canPartitionTopDown([1, 1, 3, 4, 7])}`);
console.log(`Can partitioning be done: ---> ${canPartitionTopDown([2, 3, 4, 6])}`);
console.log(`Can partitioning be done: ---> ${canPartitionTopDown([8, 8, 2])}`);
