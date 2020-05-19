const findLASLength = (nums) => {
  if (nums.length === 0) return 0;

  // dp[i][0] = stores the LAS ending at 'i' such that the last two elements are in ascending order
  // dp[i][1] = stores the LAS ending at 'i' such that the last two elements are in descending order

  const dp = Array(nums.length)
    .fill(0)
    .map(() => Array(2).fill(0));

  let maxLength = 0;

  for (let i = 0; i < nums.length; i++) {
    // every single element can be considered as a LAS of length 1
    dp[i][0] = dp[i][1] = 1;
    for (let j = 0; j < i; j++) {
      if (nums[i] > nums[j]) {
        // if nums[i] is BIGGER than nums[j] then we will consider the LAS ending at 'j' where the
        // last two elements were in DESCENDING order
        dp[i][0] = Math.max(dp[i][0], 1 + dp[j][1]);
        maxLength = Math.max(maxLength, dp[i][0]);
      } else if (nums[i] !== nums[j]) {
        // if the numbers are equal, don't do anything
        // if nums[i] is SMALLER than nums[j] then we will consider the LAS ending at 'j' where the
        // last two elements were in ASCENDING order
        dp[i][1] = Math.max(dp[i][1], 1 + dp[j][0]);
        maxLength = Math.max(maxLength, dp[i][1]);
      }
    }
  }
  return maxLength;
};

console.log(`Length of Longest Alternating Subsequence: ---> ${findLASLength([1, 2, 3, 4])}`);
console.log(`Length of Longest Alternating Subsequence: ---> ${findLASLength([3, 2, 1, 4])}`);
console.log(`Length of Longest Alternating Subsequence: ---> ${findLASLength([1, 3, 2, 4])}`);
