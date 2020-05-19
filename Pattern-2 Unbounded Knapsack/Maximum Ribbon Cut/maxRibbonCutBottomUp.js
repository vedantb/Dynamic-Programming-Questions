let countRibbonPieces = (ribbonLengths, total) => {
    const n = ribbonLengths.length;
    const dp = Array(n)
        .fill(Number.MIN_VALUE)
        .map(() => Array(total + 1).fill(Number.MIN_VALUE));

    for (let i = 0; i < n; i++) dp[i][0] = 0;

    for (let i = 0; i < n; i++) {
        for (let t = 1; t <= total; t++) {
            if (i > 0) {
                dp[i][t] = dp[i - 1][t];
            }

            if (t >= ribbonLengths[i] && dp[i][t - ribbonLengths[i]] !== Number.MIN_VALUE) {
                dp[i][t] = Math.max(dp[i][t], 1 + dp[i][t - ribbonLengths[i]]);
            }
        }
    }

    return dp[n - 1][total] === Number.MIN_VALUE ? -1 : dp[n - 1][total];
};

console.log(`Maximum number of ribbons: ---> ${countRibbonPieces([2, 3, 5], 5)}`);
console.log(`Maximum number of ribbons: ---> ${countRibbonPieces([2, 3], 7)}`);
console.log(`Maximum number of ribbons: ---> ${countRibbonPieces([3, 5, 7], 13)}`);
console.log(`Maximum number of ribbons: ---> ${countRibbonPieces([3, 5], 7)}`);
