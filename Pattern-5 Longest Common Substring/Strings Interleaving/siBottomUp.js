const findSI = (m, n, p) => {
  // dp[mIndex][nIndex] will be storing the result of string leterleaving up to p[0..mIndex+nIndex-1]
  const dp = Array(m.length + 1)
    .fill(false)
    .map(() => Array(n.length + 1).fill(false));

  // for the empty pattern, we have one matching
  if (m.length + n.length !== p.length) return false;

  for (let mIndex = 0; mIndex <= m.length; mIndex++) {
    for (let nIndex = 0; nIndex <= n.length; nIndex++) {
      // if 'm' and 'n' are empty, then 'p' must have been empty too.
      if (mIndex === 0 && nIndex === 0) {
        dp[mIndex][nIndex] = true;
      } else if (mIndex === 0 && n[nIndex - 1] === p[mIndex + nIndex - 1]) {
        // if 'm' is empty, we need to check the leterleaving with 'n' only
        dp[mIndex][nIndex] = dp[mIndex][nIndex - 1];
      } else if (nIndex === 0 && m[mIndex - 1] === p[mIndex + nIndex - 1]) {
        // if 'n' is empty, we need to check the leterleaving with 'm' only
        dp[mIndex][nIndex] = dp[mIndex - 1][nIndex];
      } else {
        // if the letter of 'm' and 'p' match, we take whatever is matched till mIndex-1
        if (mIndex > 0 && m[mIndex - 1] === p[mIndex + nIndex - 1]) {
          dp[mIndex][nIndex] = dp[mIndex - 1][nIndex];
        }
        // if the letter of 'n' and 'p' match, we take whatever is matched till nIndex-1 too
        // note the '||', this is required when we have common letters
        if (nIndex > 0 && n[nIndex - 1] === p[mIndex + nIndex - 1]) {
          dp[mIndex][nIndex] = dp[mIndex][nIndex] || dp[mIndex][nIndex - 1];
        }
      }
    }
  }
  return dp[m.length][n.length];
};

console.log(`String leterleaving: ---> ${findSI('abd', 'cef', 'abcdef')}`);
console.log(`String leterleaving: ---> ${findSI('abd', 'cef', 'adcbef')}`);
console.log(`String leterleaving: ---> ${findSI('abc', 'def', 'abdccf')}`);
console.log(`String leterleaving: ---> ${findSI('abcdef', 'mnop', 'mnaobcdepf')}`);
