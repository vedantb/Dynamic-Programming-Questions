const findMPPCuts = (st) => {
    const dp = [];
    const dpIsPalindrome = [];

    let findMPPCutsHelper = (st, startIndex, endIndex) => {
        // we don't need to cut the string if it is a palindrome
        if (startIndex >= endIndex || isPalindrome(st, startIndex, endIndex)) {
            return 0;
        }

        dp[startIndex] = dp[startIndex] || [];

        if (endIndex in dp[startIndex]) return dp[startIndex][endIndex];

        // at max we need to cut the string into 'length - 1' pieces
        let minimumCuts = endIndex - startIndex;
        for (let i = startIndex; i <= endIndex; i++) {
            if (isPalindrome(st, startIndex, i)) {
                // we can cut here as we have a palindrome from 'startIndex' to 'i'
                minimumCuts = Math.min(minimumCuts, 1 + findMPPCutsHelper(st, i + 1, endIndex));
            }
        }
        dp[startIndex][endIndex] = minimumCuts;
        return dp[startIndex][endIndex];
    };

    let isPalindrome = (st, x, y) => {
        dpIsPalindrome[x] = dpIsPalindrome[x] || [];
        if (y in dpIsPalindrome[x]) return dpIsPalindrome[x][y];

        let i = x,
            j = y;
        while (i <= j) {
            if (st[i++] !== st[j--]) {
                dpIsPalindrome[x][y] = false;
                return dpIsPalindrome[x][y];
            }
        }

        dpIsPalindrome[x][y] = true;
        return dpIsPalindrome[x][y];
    };

    return findMPPCutsHelper(st, 0, st.length - 1);
};
console.log(`Minimum palindrome partitions ---> ${findMPPCuts('abdbca')}`);
console.log(`Minimum palindrome partitions ---> ${findMPPCuts('cdpdd')}`);
console.log(`Minimum palindrome partitions ---> ${findMPPCuts('pqr')}`);
console.log(`Minimum palindrome partitions ---> ${findMPPCuts('pp')}`);
