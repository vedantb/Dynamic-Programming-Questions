const findTargetSubsets = function (num, s) {
    let totalSum = 0;
    for (let i = 0; i < num.length; i++) totalSum += num[i];

    // if 's + totalSum' is odd, we can't find a subset with sum equal to '(s + totalSum) / 2'
    if (totalSum < s || (s + totalSum) % 2 == 1) return 0;

    return countSubsets(num, (s + totalSum) / 2);
};

let countSubsets = (num, sum) => {
    const n = num.length;
    const dp = Array(sum + 1).fill(0);
    dp[0] = 1;

    for (let s = 1; s <= sum; s++) {
        dp[s] = num[0] === s ? 1 : 0;
    }

    for (let i = 1; i < n; i++) {
        for (let s = sum; s >= 0; s--) {
            if (s >= num[i]) dp[s] += dp[s - num[i]];
        }
    }

    return dp[sum];
};

console.log(`Count of Target sum is: ---> ${findTargetSubsets([1, 1, 2, 3], 1)}`);
console.log(`Count of Target sum is: ---> ${findTargetSubsets([1, 2, 7, 1], 9)}`);
