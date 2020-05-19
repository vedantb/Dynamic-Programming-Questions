const findMSIS = (nums) => {
    const dp = Array(nums.length).fill(0);
    dp[0] = nums[0];

    let maxSum = nums[0];

    for (let i = 1; i < nums.length; i++) {
        dp[i] = nums[i];
        for (let j = 0; j < i; j++) {
            if (nums[i] > nums[j] && dp[i] < dp[j] + nums[i]) dp[i] = dp[j] + nums[i];
        }
        maxSum = Math.max(maxSum, dp[i]);
    }

    return maxSum;
};

console.log(`Maximum Sum Increasing Subsequence is: ---> ${findMSIS([4, 1, 2, 6, 10, 1, 12])}`);
console.log(`Maximum Sum Increasing Subsequence is: ---> ${findMSIS([-4, 10, 3, 7, 15])}`);
console.log(
    'Maximum Sum Increasing Subsequence is: ---> ' + findMSIS([1, 3, 8, 4, 14, 6, 14, 1, 9, 4, 13, 3, 11, 17, 29])
);
