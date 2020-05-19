const findLCSLength = function (s1, s2) {
  const dp = [];
  function findLCSLengthHelper(s1, s2, i1, i2) {
    if (i1 == s1.length || i2 == s2.length) return 0;

    dp[i1] = dp[i1] || [];
    if (typeof dp[i1][i2] === 'undefined') {
      if (s1[i1] === s2[i2]) dp[i1][i2] = 1 + findLCSLengthHelper(s1, s2, i1 + 1, i2 + 1);
      else {
        let c1 = findLCSLengthHelper(s1, s2, i1, i2 + 1);
        let c2 = findLCSLengthHelper(s1, s2, i1 + 1, i2);
        dp[i1][i2] = Math.max(c1, c2);
      }
    }

    return dp[i1][i2];
  }
  return findLCSLengthHelper(s1, s2, 0, 0);
};

console.log(`Length of Longest Common Subsequence: ---> ${findLCSLength('abdca', 'cbda')}`);
console.log(`Length of Longest Common Subsequence: ---> ${findLCSLength('passport', 'ppsspt')}`);
