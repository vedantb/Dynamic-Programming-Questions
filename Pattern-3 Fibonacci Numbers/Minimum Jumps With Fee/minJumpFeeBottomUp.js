const findMinFee = (fee) => {
    const dp = Array(fee.length + 1).fill(0);

    dp[0] = 0; // if there are no steps, we dont have to pay any fee
    dp[1] = fee[0]; // only one step, so we have to pay its fee

    // for 2 steps, since we start from the first step, so we have to pay its fee
    // and from the first step we can reach the top by taking two steps, so
    // we dont have to pay any other fee.
    dp[2] = fee[0];

    // please note that dp[] has one extra element to handle the 0th step
    for (let i = 2; i < fee.length; i++) {
        dp[i + 1] = Math.min(fee[i] + dp[i], fee[i - 1] + dp[i - 1], fee[i - 2] + dp[i - 2]);
    }

    return dp[fee.length];
};

console.log(`Minimum fee needed: ---> ${findMinFee([1, 2, 5, 2, 1, 2])}`);
console.log(`Minimum fee needed: ---> ${findMinFee([2, 3, 4, 5])}`);
