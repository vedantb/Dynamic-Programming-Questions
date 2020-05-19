let solveRodCutting = (lengths, prices, n) => {
    // base checks
    if (n <= 0 || prices.length === 0 || prices.length !== lengths.length) return 0;

    const lengthCount = lengths.length;
    const dp = Array(lengthCount)
        .fill(0)
        .map(() => Array(n + 1).fill(0));

    // capacity 0 columns are already initialized with 0 when we initialized the table

    for (let i = 0; i < lengthCount; i++) {
        for (let len = 1; len <= n; len++) {
            let profit1 = 0;
            let profit2 = 0;
            if (lengths[i] <= len) profit1 = prices[i] + dp[i][len - lengths[i]];
            if (i > 0) profit2 = dp[i - 1][len];

            dp[i][len] = Math.max(profit1, profit2);
        }
    }

    return dp[lengthCount - 1][n];
};

const lengths = [1, 2, 3, 4, 5];
const prices = [2, 6, 7, 10, 13];
console.log(`Maximum profit: ---> ${solveRodCutting(lengths, prices, 5)}`);
