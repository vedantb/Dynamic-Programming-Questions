const findMaxSteal = (wealth) => {
    const dp = [];
    const findMaxStealHelper = (wealth, currentIndex) => {
        if (currentIndex >= wealth.length) return 0;

        if (currentIndex in dp) return dp[currentIndex];

        // steal from current house and skip one to steal from next house
        const stealCurrent = wealth[currentIndex] + findMaxStealHelper(wealth, currentIndex + 2);

        // skip current house to steal from the adjacent house
        const skipCurrent = findMaxStealHelper(wealth, currentIndex + 1);

        dp[currentIndex] = Math.max(stealCurrent, skipCurrent);

        return dp[currentIndex];
    };

    return findMaxStealHelper(wealth, 0);
};

console.log(`Maximum stealing: ---> ${findMaxSteal([2, 5, 1, 3, 6, 2, 4])}`);
console.log(`Maximum stealing: ---> ${findMaxSteal([2, 10, 14, 8, 1])}`);
