const findMSIS = (nums) => {
    const dp = {};
    const findMSISHelper = (nums, currentIndex, previousIndex, sum) => {
        if (currentIndex === nums.length) return sum;

        const subProblemKey = `${currentIndex}-${previousIndex}-${sum}`;

        if (subProblemKey in dp) return dp[subProblemKey];

        // include nums[currentIndex] if its larger than the last included number
        let s1 = sum;
        if (previousIndex === -1 || nums[currentIndex] > nums[previousIndex]) {
            s1 = findMSISHelper(nums, currentIndex + 1, currentIndex, sum + nums[currentIndex]);
        }

        // exclude the number at currentIndex
        const s2 = findMSISHelper(nums, currentIndex + 1, previousIndex, sum);

        dp[subProblemKey] = Math.max(s1, s2);
        return dp[subProblemKey];
    };
    return findMSISHelper(nums, 0, -1, 0);
};

console.log(`Maximum Sum Increasing Subsequence is: ---> ${findMSIS([4, 1, 2, 6, 10, 1, 12])}`);
console.log(`Maximum Sum Increasing Subsequence is: ---> ${findMSIS([-4, 10, 3, 7, 15])}`);
