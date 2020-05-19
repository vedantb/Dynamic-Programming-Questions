const findLCSLength = (s1, s2) => {
    const maxLength = Math.min(s1.length, s2.length);
    const dp = [];
    let findLCSHelper = (s1, s2, i1, i2, count) => {
        if (i1 === s1.length || i2 === s2.length) return count;

        dp[i1] = dp[i1] || [];
        dp[i1][i2] = dp[i1][i2] || [];

        if (count in dp[i1][i2]) return dp[i1][i2][count];

        let c3 = count;
        if (s1[i1] === s2[i2]) {
            c3 = findLCSHelper(s1, s2, i1 + 1, i2 + 1, count + 1);
        }

        const c1 = findLCSHelper(s1, s2, i1, i2 + 1, 0);
        const c2 = findLCSHelper(s1, s2, i1 + 1, i2, 0);

        dp[i1][i2][count] = Math.max(c3, Math.max(c1, c2));
        return dp[i1][i2][count];
    };
    return findLCSHelper(s1, s2, 0, 0, 0);
};

console.log(`Length of Longest Common Substring: ---> ${findLCSLength('abdca', 'cbda')}`);
console.log(`Length of Longest Common Substring: ---> ${findLCSLength('passport', 'ppsspt')}`);
