let solveKnapsackTopDown = (profits, weights, capacity) => {
    const dp = [];
    let knapSackRecursive = (capacity, currentIndex) => {
        // base checks
        if (capacity <= 0 || currentIndex >= profits.length) return 0;

        dp[currentIndex] = dp[currentIndex] || [];
        if (typeof dp[currentIndex][capacity] !== 'undefined') {
            return dp[currentIndex][capacity];
        }

        // recursive call after choosing the element at the current index
        // if the weight of the element at the current index exceeds capacity, we shouldn't process this
        let profit1 = 0;
        if (weights[currentIndex] <= capacity) {
            profit1 = profits[currentIndex] + knapSackRecursive(capacity - weights[currentIndex], currentIndex + 1);
        }

        // recursive call after excluding the element at the currentIndex
        const profit2 = knapSackRecursive(capacity, currentIndex + 1);

        dp[currentIndex][capacity] = Math.max(profit1, profit2);
        return dp[currentIndex][capacity];
    };

    return knapSackRecursive(capacity, 0);
};

var profits = [1, 6, 10, 16];
var weights = [1, 2, 3, 5];
console.log(`Total knapsack profit: ---> ${solveKnapsackTopDown(profits, weights, 7)}`);
console.log(`Total knapsack profit: ---> ${solveKnapsackTopDown(profits, weights, 6)}`);

/**
 * Since our memoization array dp[profits.length][capacity+1] stores the results for all the subproblems,
 * we can conclude that we will not have more than N*CN∗C subproblems (where ‘N’ is the number of items and ‘C’ is the knapsack capacity).
 *  This means that our time complexity will be O(N*C).
 *
 * The above algorithm will be using O(N*C) space for the memoization array. Other than that we will use O(N) space
 * for the recursion call-stack. So the total space complexity will be O(N*C + N), which is asymptotically equivalent to O(N*C).
 */
