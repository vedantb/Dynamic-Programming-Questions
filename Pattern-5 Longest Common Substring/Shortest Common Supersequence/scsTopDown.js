const findSCSLength = (s1, s2) => {
    const dp = [];
    let findSCSLengthHelper = (s1, s2, i1, i2) => {
        // if we have reached the end of a string, return the remaining length of the other string, as in
        // this case we have to take all of the remaing other string
        if (i1 === s1.length) return s2.length - i2;
        if (i2 === s2.length) return s1.length - i1;

        dp[i1] = dp[i1] || [];

        if (i2 in dp[i1]) return dp[i1][i2];

        if (s1[i1] === s2[i2]) {
            dp[i1][i2] = 1 + findSCSLengthHelper(s1, s2, i1 + 1, i2 + 1);
        } else {
            let length1 = 1 + findSCSLengthHelper(s1, s2, i1, i2 + 1);
            let length2 = 1 + findSCSLengthHelper(s1, s2, i1 + 1, i2);
            dp[i1][i2] = Math.min(length1, length2);
        }

        return dp[i1][i2];
    };
    return findSCSLengthHelper(s1, s2, 0, 0);
};

console.log(`Length of Shortest Common Subsequence: Substring: ---> ${findSCSLength('abcf', 'bdcf')}`);
console.log(`Length of Shortest Common Subsequence: Substring: ---> ${findSCSLength('dynamic', 'programming')}`);
