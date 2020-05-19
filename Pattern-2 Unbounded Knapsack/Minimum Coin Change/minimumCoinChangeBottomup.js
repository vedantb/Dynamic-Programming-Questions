let countChange = (denominations, total) => {
    const n = denominations.length;
    const dp = Array(denominations.length)
        .fill(0)
        .map(() => Array(total + 1).fill(Number.MAX_VALUE));

    // populate the total=0 columns, as we don't need any coin to make zero total
    for (let i = 0; i < n; i++) dp[i][0] = 0;

    for (let i = 0; i < n; i++) {
        for (let t = 1; t <= total; t++) {
            if (i > 0) {
                // exclude the coin
                dp[i][t] = dp[i - 1][t];
            }
            if (t >= denominations[i]) {
                // include the coin
                dp[i][t] = Math.min(dp[i][t], dp[i][t - denominations[i]] + 1);
            }
        }
    }

    // total combinations will be at the bottom-right corner.
    return dp[n - 1][total] === Number.MAX_VALUE ? -1 : dp[n - 1][total];
};

console.log(`Number of ways to make change: ---> ${countChange([1, 2, 3], 5)}`);
console.log(`Number of ways to make change: ---> ${countChange([1, 2, 3], 11)}`);
console.log(`Number of ways to make change: ---> ${countChange([1, 2, 3], 7)}`);
console.log(`Number of ways to make change: ---> ${countChange([3, 5], 7)}`);
