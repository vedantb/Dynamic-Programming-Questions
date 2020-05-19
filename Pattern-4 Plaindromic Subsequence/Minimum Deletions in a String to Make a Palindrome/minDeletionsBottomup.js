let findMinimumDeletions = (st) => {
    let dp = Array(st.length)
        .fill(0)
        .map(() => Array(st.length).fill(0));

    // every sequence with one element is a palindrome of length 1
    for (let i = 0; i < st.length; i++) {
        dp[i][i] = 1;
    }

    for (let startIndex = st.length - 1; startIndex >= 0; startIndex--) {
        for (let endIndex = startIndex + 1; endIndex < st.length; endIndex++) {
            // case1: elements at beginning and end are same
            if (st[startIndex] === st[endIndex]) {
                dp[startIndex][endIndex] = 2 + dp[startIndex + 1][endIndex - 1];
            } else {
                // case2: skip one element either from the beginning or end
                dp[startIndex][endIndex] = Math.max(dp[startIndex][endIndex - 1], dp[startIndex + 1][endIndex]);
            }
        }
    }

    // subtracting the length of Longest Palindromic Subsequence from the length of
    // the input string to get minimum number of deletions
    return st.length - dp[0][st.length - 1];
};

console.log('Minimum number of deletions required ---> ' + findMinimumDeletions('abdbca'));
console.log('Minimum number of deletions required ---> ' + findMinimumDeletions('cddpd'));
console.log('Minimum number of deletions required ---> ' + findMinimumDeletions('pqr'));
