let countChange = (denominations, total) => {
    const dp = [];

    let countChangeHelper = (denominations, total, currentIndex) => {
        // base checks
        if (total === 0) return 1;

        if (denominations.length === 0 || currentIndex >= denominations.length) return 0;

        dp[currentIndex] = dp[currentIndex] || [];

        // if we have already processed a similar sub-problem, return the result from memory
        if (typeof dp[currentIndex][total] !== 'undefined') return dp[currentIndex][total];

        //recursively call after selecting the coin at currentIndex
        // if the coin at currentIndex exceeds the total, we shouldn't process this
        let sum1 = 0;
        if (denominations[currentIndex] <= total) {
            sum1 = countChangeHelper(denominations, total - denominations[currentIndex], currentIndex);
        }

        // recursively call after excluding the coin at currentIndex
        const sum2 = countChangeHelper(denominations, total, currentIndex + 1);

        dp[currentIndex][total] = sum1 + sum2;
        return dp[currentIndex][total];
    };
    return countChangeHelper(denominations, total, 0);
};

console.log(`Number of ways to make change: ---> ${countChange([1, 2, 3], 5)}`);
