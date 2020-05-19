const countMinJumps = (jumps) => {
    const dp = Array(jumps.length).fill(Number.MAX_VALUE);
    dp[0] = 0;

    for (let start = 0; start < jumps.length; start++) {
        for (let end = start + 1; end <= start + jumps[start] && end < jumps.length; end++) {
            dp[end] = Math.min(dp[end], dp[start] + 1);
        }
    }

    return dp[jumps.length - 1];
};
console.log(`Minimum jumps needed: ---> ${countMinJumps([2, 1, 1, 1, 4])}`);
console.log(`Minimum jumps needed: ---> ${countMinJumps([1, 1, 3, 6, 9, 3, 0, 1, 3])}`);
