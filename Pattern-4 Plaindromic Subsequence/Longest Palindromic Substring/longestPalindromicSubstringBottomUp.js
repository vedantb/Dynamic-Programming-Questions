let findLPSLength = (st) => {
    // dp[i][j] will be 'true' if the string from index 'i' to index 'j' is a palindrome
    let dp = Array(st.length)
        .fill(false)
        .map(() => Array(st.length).fill(false));

    // every string with one character is a palindrome
    for (let i = 0; i < st.length; i++) {
        dp[i][i] = true;
    }

    let maxLength = 1;
    for (let startIndex = st.length - 1; startIndex >= 0; startIndex--) {
        for (let endIndex = startIndex + 1; endIndex < st.length; endIndex++) {
            // case 1: elements at beginning and end are same
            if (st[startIndex] === st[endIndex]) {
                // if it's a two character string or if the remaining string is a palindrome too
                if (endIndex - startIndex === 1 || dp[startIndex + 1][endIndex - 1]) {
                    dp[startIndex][endIndex] = true;
                    maxLength = Math.max(maxLength, endIndex - startIndex + 1);
                }
            }
        }
    }

    return maxLength;
};

console.log(`Length of LPS ---> ${findLPSLength('abdbca')}`);
console.log(`Length of LPS ---> ${findLPSLength('cddpd')}`);
console.log(`Length of LPS ---> ${findLPSLength('pqr')}`);
