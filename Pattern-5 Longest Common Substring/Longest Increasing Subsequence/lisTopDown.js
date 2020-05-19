const findLISLength = (nums) => {
    const dp = [];
    let findLISLengthHelper = (nums, currentIndex, previousIndex) => {
        if (currentIndex === nums.length) return 0;

        dp[currentIndex] = dp[currentIndex] || [];

        if (previousIndex + 1 in dp[currentIndex]) return dp[currentIndex][previousIndex + 1];

        // include nums[currentIndex] if it is larger than the last included number
        let c1 = 0;
        if (previousIndex === -1 || nums[currentIndex] > nums[previousIndex]) {
            c1 = 1 + findLISLengthHelper(nums, currentIndex + 1, currentIndex);
        }

        // excluding the number at currentIndex
        const c2 = findLISLengthHelper(nums, currentIndex + 1, previousIndex);

        dp[currentIndex][previousIndex + 1] = Math.max(c1, c2);
        return dp[currentIndex][previousIndex + 1];
    };

    return findLISLengthHelper(nums, 0, -1);
};

console.log(`Length of Longest Increasing Subsequence: ---> ${findLISLength([4, 2, 3, 6, 10, 1, 12])}`);
console.log(`Length of Longest Increasing Subsequence: ---> ${findLISLength([-4, 10, 3, 7, 15])}`);
