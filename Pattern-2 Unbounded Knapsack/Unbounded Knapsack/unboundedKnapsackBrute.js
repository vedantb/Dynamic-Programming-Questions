let solveKnapsack = (profits, weights, capacity) => {
    let solveKnapsackRecursive = (profits, weights, capacity, currentIndex) => {
        // base checks
        if (
            capacity <= 0 ||
            profits.length === 0 ||
            weights.length !== profits.length ||
            currentIndex >= profits.length
        ) {
            return 0;
        }

        // recursive call after choosing the items at the currentIndex, note that we recursive call on all
        // items as we did not increment currentIndex
        let profit1 = 0;
        if (weights[currentIndex] <= capacity) {
            profit1 =
                profits[currentIndex] +
                solveKnapsackRecursive(profits, weights, capacity - weights[currentIndex], currentIndex);
        }

        // recursive call after excluding the element at the currentIndex
        const profit2 = solveKnapsackRecursive(profits, weights, capacity, currentIndex + 1);

        return Math.max(profit1, profit2);
    };

    return solveKnapsackRecursive(profits, weights, capacity, 0);
};

var profits = [15, 50, 60, 90];
var weights = [1, 3, 4, 5];
console.log(`Total knapsack profit: ---> ${solveKnapsack(profits, weights, 8)}`);
