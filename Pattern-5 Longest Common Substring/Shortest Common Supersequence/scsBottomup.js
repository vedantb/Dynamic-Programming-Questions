const findSCSLength = (s1, s2) => {
    const dp = Array(s1.length + 1)
        .fill(0)
        .map(() => Array(s2.length + 1).fill(0));

    // if one of the strings is of zero length, SCS would be equal to the length of the other string
    for (let i = 0; i <= s1.length; i++) dp[i][0] = i;
    for (let j = 0; j <= s2.length; j++) dp[0][j] = j;

    for (let i = 1; i <= s1.length; i++) {
        for (let j = 1; j <= s2.length; j++) {
            if (s1[i - 1] == s2[j - 1]) dp[i][j] = 1 + dp[i - 1][j - 1];
            else dp[i][j] = 1 + Math.min(dp[i - 1][j], dp[i][j - 1]);
        }
    }
    return dp[s1.length][s2.length];
};

console.log(`Length of Shortest Common Subsequence: Substring: ---> ${findSCSLength('abcf', 'bdcf')}`);
console.log(`Length of Shortest Common Subsequence: Substring: ---> ${findSCSLength('dynamic', 'programming')}`);
