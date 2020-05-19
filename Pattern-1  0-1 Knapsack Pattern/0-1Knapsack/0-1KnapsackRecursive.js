let solveKnapsackBruteForce = (profits, weights, capacity) => {
    let knapSackRecursive = (capacity, currentIndex) => {
        // base checks
        if (capacity <= 0 || currentIndex >= profits.length) return 0;

        // recursive call after choosing the element at the current index
        // if the weight of the element at the current index exceeds capacity, we shouldn't process this
        let profit1 = 0;
        if (weights[currentIndex] <= capacity) {
            profit1 = profits[currentIndex] + knapSackRecursive(capacity - weights[currentIndex], currentIndex + 1);
        }

        // recursive call after excluding the element at the currentIndex
        const profit2 = knapSackRecursive(capacity, currentIndex + 1);

        return Math.max(profit1, profit2);
    };

    return knapSackRecursive(capacity, 0);
};

var profits = [1, 6, 10, 16];
var weights = [1, 2, 3, 5];
console.log(`Total knapsack profit: ---> ${solveKnapsackBruteForce(profits, weights, 7)}`);
console.log(`Total knapsack profit: ---> ${solveKnapsackBruteForce(profits, weights, 6)}`);

/**
 * The time complexity of the above algorithm is exponential O(2^n), where ‘n’ represents the total number of items.
 * This can also be confirmed from the recursion tree.
 *
 * The space complexity is O(n). This space will be used to store the recursion stack.
 * Since our recursive algorithm works in a depth-first fashion, which means,
 * we can’t have more than ‘n’ recursive calls on the call stack at any time.
 *
 * If you draw the recursion tree, you see we have an overlapping subproblem. e.g. capacity=4, index=3
 */
