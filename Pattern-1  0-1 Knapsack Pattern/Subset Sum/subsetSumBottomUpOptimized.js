let subsetSumBottomUpOptimized = function (num, sum) {
    const n = num.length;

    const dp = Array(sum + 1).fill(false);

    // populate the sum=0 column, as we can always have 0 sum without any element.
    dp[0] = true;

    // with only one number, we can form a subset only when the required sum is equal to its value
    for (let s = 1; s <= sum; s++) {
        dp[s] = num[0] === s;
    }

    // process all subsets for all sums
    for (let i = 1; i < n; i++) {
        for (let s = sum; s >= 0; s--) {
            // if dp[s]==true, this means we can get the sum 's' without num[i], hence we can move on to
            // the next number else we can include num[i] and see if we can find a subset to get the
            // remaining sum
            if (!dp[s] && s >= num[i]) {
                dp[s] = dp[s - num[i]];
            }
        }
    }

    return dp[sum];
};

console.log(`Can partitioning be done: ---> ${subsetSumBottomUpOptimized([1, 2, 3, 4], 6)}`);
console.log(`Can partitioning be done: ---> ${subsetSumBottomUpOptimized([1, 2, 7, 1, 5], 10)}`);
console.log(`Can partitioning be done: ---> ${subsetSumBottomUpOptimized([1, 3, 4, 8], 6)}`);
