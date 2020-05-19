let solveKnapsack = (profits, weights, capacity) => {
    // base checks
    if (capacity <= 0 || profits.length === 0 || weights.length !== profits.length) return 0;

    const n = profits.length;
    const dp = Array(profits.length)
        .fill(0)
        .map(() => Array(capacity + 1).fill(0));

    // capacity 0 columns are already initialized with 0 when we initialized the table

    for (let i = 0; i < n; i++) {
        for (let c = 1; c <= capacity; c++) {
            let profit1 = 0;
            let profit2 = 0;
            if (weights[i] <= c) profit1 = profits[i] + dp[i][c - weights[i]];
            if (i > 0) profit2 = dp[i - 1][c];

            dp[i][c] = profit1 > profit2 ? profit1 : profit2;
        }
    }

    return dp[n - 1][capacity];
};

var profits = [15, 50, 60, 90];
var weights = [1, 3, 4, 5];
console.log(`Total knapsack profit: ---> ${solveKnapsack(profits, weights, 8)}`);
console.log(`Total knapsack profit: ---> ${solveKnapsack(profits, weights, 6)}`);
