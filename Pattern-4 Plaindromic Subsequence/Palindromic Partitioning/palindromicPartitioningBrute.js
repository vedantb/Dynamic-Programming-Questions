const findMPPCuts = (st) => {
    let findMPPCutsHelper = (st, startIndex, endIndex) => {
        // we don't need to cut the string if it is a palindrome
        if (startIndex >= endIndex || isPalindrome(st, startIndex, endIndex)) {
            return 0;
        }

        // at max we need to cut the string into 'length - 1' pieces
        let minimumCuts = endIndex - startIndex;
        for (let i = startIndex; i <= endIndex; i++) {
            if (isPalindrome(st, startIndex, i)) {
                // we can cut here as we have a palindrome from 'startIndex' to 'i'
                minimumCuts = Math.min(minimumCuts, 1 + findMPPCutsHelper(st, i + 1, endIndex));
            }
        }
        return minimumCuts;
    };

    let isPalindrome = (st, x, y) => {
        while (x <= y) {
            if (st[x++] !== st[y--]) {
                return false;
            }
        }
        return true;
    };

    return findMPPCutsHelper(st, 0, st.length - 1);
};
console.log(`Minimum palindrome partitions ---> ${findMPPCuts('abdbca')}`);
console.log(`Minimum palindrome partitions ---> ${findMPPCuts('cdpdd')}`);
console.log(`Minimum palindrome partitions ---> ${findMPPCuts('pqr')}`);
console.log(`Minimum palindrome partitions ---> ${findMPPCuts('pp')}`);
