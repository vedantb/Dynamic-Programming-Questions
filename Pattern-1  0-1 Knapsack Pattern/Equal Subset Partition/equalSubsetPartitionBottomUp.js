let canPartitionBottomUp = function (num) {
    const n = num.length;

    // find the total sum
    let sum = 0;
    for (let i = 0; i < n; i++) sum += num[i];

    // if sum is an odd number we can't have two subsets with equal sum
    if (sum % 2 !== 0) return false;

    // we are trying to find a subset of given numbers that has a total of 'sum/2'
    sum /= 2;

    const dp = Array(n)
        .fill(false)
        .map(() => Array(sum + 1).fill(false));

    // populate the sum=0 column, as we can always have 0 sum without any element.
    for (let i = 0; i < n; i++) dp[i][0] = true;

    // with only one number, we can form a subset only when the required sum is equal to its value
    for (let s = 1; s <= sum; s++) {
        dp[0][s] = num[0] === s;
    }

    // process all subsets for all sums
    for (let i = 1; i < n; i++) {
        for (let s = 1; s <= sum; s++) {
            // if we can get the sum 's' without the number at index 'i'
            if (dp[i - 1][s]) {
                dp[i][s] = dp[i - 1][s];
            } else if (s >= num[i]) {
                dp[i][s] = dp[i - 1][s - num[i]];
            }
        }
    }

    return dp[n - 1][sum];
};

console.log(`Can partitioning be done: ---> ${canPartitionBottomUp([1, 2, 3, 4])}`);
console.log(`Can partitioning be done: ---> ${canPartitionBottomUp([1, 1, 3, 4, 7])}`);
console.log(`Can partitioning be done: ---> ${canPartitionBottomUp([2, 3, 4, 6])}`);
console.log(`Can partitioning be done: ---> ${canPartitionBottomUp([8, 8, 2])}`);
