const findLRSLength = (str) => {
  const dp = Array(str.length + 1)
    .fill(0)
    .map(() => Array(str.length + 1).fill(0));

  let maxLength = 0;

  // dp[i1][i2] will be storing the LRS up to str[0..i1-1][0..i2-1]
  // this also means that subsequences of length zero (first row and column of dp[][]),
  // will always have LRS of size zero.
  for (let i1 = 1; i1 <= str.length; i1++) {
    for (let i2 = 1; i2 <= str.length; i2++) {
      if (i1 !== i2 && str[i1 - 1] === str[i2 - 1]) {
        dp[i1][i2] = 1 + dp[i1 - 1][i2 - 1];
      } else {
        dp[i1][i2] = Math.max(dp[i1 - 1][i2], dp[i1][i2 - 1]);
      }

      maxLength = Math.max(maxLength, dp[i1][i2]);
    }
  }

  return maxLength;
};

console.log(`Length of Longest Repeating Subsequence: ---> ${findLRSLength('tomorrow')}`);
console.log(`Length of Longest Repeating Subsequence: ---> ${findLRSLength('aabdbcec')}`);
console.log(`Length of Longest Repeating Subsequence: ---> ${findLRSLength('fmff')}`);
