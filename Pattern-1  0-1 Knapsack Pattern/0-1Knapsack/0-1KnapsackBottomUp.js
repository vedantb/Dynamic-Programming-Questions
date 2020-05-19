let solveKnapsack = function (profits, weights, capacity) {
    const n = profits.length;
    if (capacity <= 0 || n === 0 || weights.length !== n) return 0;

    const dp = Array(n)
        .fill(0)
        .map(() => Array(capacity + 1).fill(0));

    // populate the capacity=0 column with 0 profit
    for (let i = 0; i < n; i++) dp[i][0] = 0;

    // if we have only one weight, we will take it if it is not more than the capacity
    for (let c = 0; c <= capacity; c++) {
        if (weights[0] <= c) dp[0][c] = profits[0];
    }

    //process all subarrays for all capacities
    for (let i = 1; i < n; i++) {
        for (let c = 1; c <= capacity; c++) {
            let profit1 = 0;
            let profit2 = 0;

            // include the item if its not more than the capacity
            if (weights[i] <= c) profit1 = profits[i] + dp[i - 1][c - weights[i]];

            //exclude the ittem
            profit2 = dp[i - 1][c];

            //take max
            dp[i][c] = Math.max(profit1, profit2);
        }
    }

    // This block is to just print the selected knapsack items
    let selectedWeights = '';
    let totalProfit = dp[n - 1][capacity];
    let remainingCapacity = capacity;
    for (let i = n - 1; i > 0; i++) {
        if (totalProfit !== dp[i - 1][remainingCapacity]) {
            selectedWeights = `${weights[i]} ${selectedWeights}`;
            remainingCapacity -= weights[i];
            totalProfit -= profits[i];
        }
    }

    if (totalProfit !== 0) selectedWeights = `${weights[0]} ${selectedWeights}`;

    console.log(`Selected weights: ${selectedWeights}`);

    return dp[n - 1][capacity];
};

var profits = [1, 6, 10, 16];
var weights = [1, 2, 3, 5];
console.log(`Total knapsack profit: ---> ${solveKnapsack(profits, weights, 7)}`);
console.log(`Total knapsack profit: ---> ${solveKnapsack(profits, weights, 6)}`);
