let findLPSLength = (st) => {
    const dp = [];
    let findLpsLengthHelper = (st, startIndex, endIndex) => {
        if (startIndex > endIndex) return 0;

        // every string with one character is a palindrome
        if (startIndex === endIndex) return 1;

        dp[startIndex] = dp[startIndex] || [];

        if (endIndex in dp[startIndex]) return dp[startIndex][endIndex];

        // case 1: elements at the beginning and the end are the same
        if (st[startIndex] === st[endIndex]) {
            const remainingLength = endIndex - startIndex - 1;
            // check if the remaining string is also a palindrome
            if (remainingLength === findLpsLengthHelper(st, startIndex + 1, endIndex - 1)) {
                dp[startIndex][endIndex] = remainingLength + 2;
                return dp[startIndex][endIndex];
            }
        }

        // case 2: skip one character either from beginning or end
        const c1 = findLpsLengthHelper(st, startIndex + 1, endIndex);
        const c2 = findLpsLengthHelper(st, startIndex, endIndex - 1);
        dp[startIndex][endIndex] = Math.max(c1, c2);
        return dp[startIndex][endIndex];
    };

    return findLpsLengthHelper(st, 0, st.length - 1);
};

console.log(`Length of LPS ---> ${findLPSLength('abdbca')}`);
console.log(`Length of LPS ---> ${findLPSLength('cddpd')}`);
console.log(`Length of LPS ---> ${findLPSLength('pqr')}`);
