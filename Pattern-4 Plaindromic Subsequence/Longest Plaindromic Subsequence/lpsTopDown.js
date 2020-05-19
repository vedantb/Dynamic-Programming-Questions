let findLPSLength = (st) => {
    let dp = [];

    let findLPSLengthHelper = (st, startIndex, endIndex) => {
        if (startIndex > endIndex) return 0;

        // every sequence with one element is a palindrome of length 1
        if (startIndex === endIndex) return 1;

        dp[startIndex] = dp[startIndex] || [];

        if (endIndex in dp[startIndex]) return dp[startIndex][endIndex];

        if (st[startIndex] === st[endIndex]) {
            // case 1: elements at beginning and end are same
            dp[startIndex][endIndex] = 2 + findLPSLengthHelper(st, startIndex + 1, endIndex - 1);
        } else {
            // case 2: skip one element either from the beginning or the end
            let c1 = findLPSLengthHelper(st, startIndex + 1, endIndex);
            let c2 = findLPSLengthHelper(st, startIndex, endIndex - 1);
            dp[startIndex][endIndex] = Math.max(c1, c2);
        }

        return dp[startIndex][endIndex];
    };

    return findLPSLengthHelper(st, 0, st.length - 1);
};

console.log('Length of LPS ---> ' + findLPSLength('abdbca'));
console.log('Length of LPS ---> ' + findLPSLength('cddpd'));
console.log('Length of LPS ---> ' + findLPSLength('pqr'));
