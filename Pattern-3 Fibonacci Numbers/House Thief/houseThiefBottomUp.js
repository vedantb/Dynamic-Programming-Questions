const findMaxSteal = (wealth) => {
    if (wealth.length === 0) return 0;

    const dp = Array(wealth.length + 1).fill(0);

    dp[0] = 0; // can't steal anything if there are no houses
    dp[1] = wealth[0]; // only one house so thief steals from it

    // please note that dp[] has one extra element to handle zero house
    for (let i = 1; i < wealth.length; i++) {
        dp[i + 1] = Math.max(wealth[i] + dp[i - 1], dp[i]);
    }

    return dp[wealth.length];
};
console.log(`Maximum stealing: ---> ${findMaxSteal([2, 5, 1, 3, 6, 2, 4])}`);
console.log(`Maximum stealing: ---> ${findMaxSteal([2, 10, 14, 8, 1])}`);
