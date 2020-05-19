const findMaxSteal = (wealth) => {
    const findMaxStealHelper = (wealth, currentIndex) => {
        if (currentIndex >= wealth.length) return 0;

        // steal from current house and skip one to steal from next house
        const stealCurrent = wealth[currentIndex] + findMaxStealHelper(wealth, currentIndex + 2);

        // skip current house to steal from the adjacent house
        const skipCurrent = findMaxStealHelper(wealth, currentIndex + 1);

        return Math.max(stealCurrent, skipCurrent);
    };

    return findMaxStealHelper(wealth, 0);
};

console.log(`Maximum stealing: ---> ${findMaxSteal([2, 5, 1, 3, 6, 2, 4])}`);
console.log(`Maximum stealing: ---> ${findMaxSteal([2, 10, 14, 8, 1])}`);
