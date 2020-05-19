const findSPMCount = (str, pat) => {
  // every empty pattern has one match
  if (pat.length === 0) return 1;

  if (str.length === 0 || pat.length > str.length) return 0;

  // dp[strIndex][patIndex] will be storing the count of SPM up to str[0..strIndex-1][0..patIndex-1]
  const dp = Array(str.length + 1)
    .fill(0)
    .map(() => Array(pat.length + 1).fill(0));

  // for the empty pattern, we have one matching
  for (let i = 0; i <= str.length; i++) dp[i][0] = 1;

  for (let strIndex = 1; strIndex <= str.length; strIndex++) {
    for (let patIndex = 1; patIndex <= pat.length; patIndex++) {
      if (str[strIndex - 1] === pat[patIndex - 1]) {
        dp[strIndex][patIndex] = dp[strIndex - 1][patIndex - 1];
      }
      dp[strIndex][patIndex] += dp[strIndex - 1][patIndex];
    }
  }

  return dp[str.length][pat.length];
};

console.log(`Count of pattern in the string: ---> ${findSPMCount('baxmx', 'ax')}`);
console.log(`Count of pattern in the string: ---> ${findSPMCount('tomorrow', 'tor')}`);
