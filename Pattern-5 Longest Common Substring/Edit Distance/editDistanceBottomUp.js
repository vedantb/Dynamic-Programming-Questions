const editDistance = (s1, s2) => {
  const dp = Array(s1.length + 1)
    .fill(0)
    .map(() => Array(s2.length + 1).fill(0));

  // if s2 is empty, we can remove all the characters of s1 to make it empty too
  for (let i1 = 0; i1 <= s1.length; i1++) dp[i1][0] = i1;

  // if s1 is empty, we have to insert all the characters of s2
  for (let i2 = 0; i2 <= s2.length; i2++) dp[0][i2] = i2;

  for (let i1 = 1; i1 <= s1.length; i1++) {
    for (let i2 = 1; i2 <= s2.length; i2++) {
      // If the strings have a matching character, we can recursively match for the remaining lengths
      if (s1[i1 - 1] === s2[i2 - 1]) {
        dp[i1][i2] = dp[i1 - 1][i2 - 1];
      } else {
        dp[i1][i2] = 1 + Math.min(dp[i1 - 1][i2], Math.min(dp[i1][i2 - 1], dp[i1 - 1][i2 - 1]));
      }
    }
  }
  return dp[s1.length][s2.length];
};

console.log(`Minimum Edit Distance: ---> ${findMinOperations('bat', 'but')}`);
console.log(`Minimum Edit Distance: ---> ${findMinOperations('abdca', 'cbda')}`);
console.log(`Minimum Edit Distance: ---> ${findMinOperations('passpot', 'ppsspqrt')}`);
