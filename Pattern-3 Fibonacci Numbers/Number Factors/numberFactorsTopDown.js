const countWays = function (n) {
    const dp = [];

    function countWaysRecursive(n) {
        if (n == 0) return 1; // base case, we don't need to subtract any thing, so there is only one way

        if (n == 1) return 1; // we can take subtract 1 to be left with zero, and that is the only way

        if (n == 2) return 1; // we can subtract 1 twice to get zero and that is the only way

        if (n == 3) return 2; // '3' can be expressed as {1,1,1}, {3}

        if (typeof dp[n] === 'undefined') {
            // if we subtract 1, we are left with 'n-1'
            const subtract1 = countWaysRecursive(n - 1);
            // if we subtract 3, we are left with 'n-3'
            const subtract3 = countWaysRecursive(n - 3);
            // if we subtract 4, we are left with 'n-4'
            const subtract4 = countWaysRecursive(n - 4);
            dp[n] = subtract1 + subtract3 + subtract4;
        }

        return dp[n];
    }
    return countWaysRecursive(n);
};

console.log(`Number of ways: ---> ${countWays(4)}`);
console.log(`Number of ways: ---> ${countWays(5)}`);
console.log(`Number of ways: ---> ${countWays(6)}`);
