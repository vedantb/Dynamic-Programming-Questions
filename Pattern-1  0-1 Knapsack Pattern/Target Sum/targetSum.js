const findTargetSubsets = (num, sum) => {
    let totalSum = 0;
    for (let i = 0; i < num.length; i++) totalSum += num[i];

    // if 's + totalSum' is odd, we can't find a subset with sum equal to '(s + totalSum) / 2`
    if (totalSum < sum || (sum + totalSum) % 2 === 1) return 0;

    return countSubsets(num, (sum + totalSum) / 2);
};

let countSubsets = function (num, sum) {
    const n = num.length;
    const dp = Array(n)
        .fill(0)
        .map(() => Array(sum + 1).fill(0));

    // populate the sum=0 columns, as we will always have an empty set for zero sum
    for (let i = 0; i < n; i++) {
        dp[i][0] = 1;
    }

    // with only one number, we can form a subset only when the required sum is equal to its value
    for (let s = 1; s <= sum; s++) {
        dp[0][s] = num[0] == s ? 1 : 0;
    }

    // process all subsets for all sums
    for (let i = 1; i < num.length; i++) {
        for (let s = 1; s <= sum; s++) {
            // exclude the number
            dp[i][s] = dp[i - 1][s];
            // include the number, if it does not exceed the sum
            if (s >= num[i]) {
                dp[i][s] += dp[i - 1][s - num[i]];
            }
        }
    }

    // the bottom-right corner will have our answer.
    return dp[num.length - 1][sum];
};
console.log(`Count of Target sum is: ---> ${findTargetSubsets([1, 1, 2, 3], 1)}`);
console.log(`Count of Target sum is: ---> ${findTargetSubsets([1, 2, 7, 1], 9)}`);
