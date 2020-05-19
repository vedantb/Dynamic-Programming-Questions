const findMinimumDeletions = (nums) => {
    const dp = Array(nums.length).fill(0);
    dp[0] = 1;
    let maxLength = 1;

    for (let i = 1; i < nums.length; i++) {
        dp[i] = 1;
        for (let j = 0; j < i; j++) {
            if (nums[i] > nums[j] && dp[i] <= dp[j]) {
                dp[i] = dp[j] + 1;
                maxLength = Math.max(maxLength, dp[i]);
            }
        }
    }

    // subtracting the length of LIS from the length of the input array to get
    // minimum number of deletions
    return nums.length - maxLength;
};

console.log(`Minimum deletion needed: ---> ${findMinimumDeletions([4, 2, 3, 6, 10, 1, 12])}`);
console.log(`Minimum deletion needed: ---> ${findMinimumDeletions([-4, 10, 3, 7, 15])}`);
console.log(`Minimum deletion needed: ---> ${findMinimumDeletions([3, 2, 1, 0])}`);
