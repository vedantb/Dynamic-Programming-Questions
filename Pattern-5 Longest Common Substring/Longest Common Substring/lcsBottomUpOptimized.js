const findLCSLength = function (s1, s2) {
    const dp = Array(2)
        .fill(0)
        .map(() => Array(s2.length + 1).fill(0));

    let maxLength = 0;
    for (let i = 1; i <= s1.length; i++) {
        for (let j = 1; j <= s2.length; j++) {
            dp[i % 2][j] = 0;
            if (s1.charAt(i - 1) == s2.charAt(j - 1)) {
                dp[i % 2][j] = 1 + dp[(i - 1) % 2][j - 1];
                maxLength = Math.max(maxLength, dp[i % 2][j]);
            }
        }
    }
    return maxLength;
};

console.log(`Length of Longest Common Substring: ---> ${findLCSLength('abdca', 'cbda')}`);
console.log(`Length of Longest Common Substring: ---> ${findLCSLength('passport', 'ppsspt')}`);
