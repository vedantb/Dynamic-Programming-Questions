const findMPPCuts = (st) => {
    // isPalindrome[i][j] will be 'true' if the string from index 'i' to 'j' is a palindrome
    const isPalindrome = Array(st.length)
        .fill(false)
        .map(() => Array(st.length).fill(false));

    // every string with one character is a palindrome
    for (let i = 0; i < st.length; i++) {
        isPalindrome[i][i] = true;
    }

    // populate the isPalindrome table
    for (let startIndex = st.length - 1; startIndex >= 0; startIndex--) {
        for (let endIndex = startIndex + 1; endIndex < st.length; endIndex++) {
            if (st[startIndex] === st[endIndex]) {
                // if it's a two character string or the remaining string is a palindrome too
                if (endIndex - startIndex === 1 || isPalindrome[startIndex + 1][endIndex - 1]) {
                    isPalindrome[startIndex][endIndex] = true;
                }
            }
        }
    }

    // populating the second table, every index in 'cuts' stores the minimum cuts needed for the substring
    // from that index till the end
    const cuts = Array(st.length).fill(0);

    for (let startIndex = st.length - 1; startIndex >= 0; startIndex--) {
        let minimumCuts = st.length;
        for (let endIndex = st.length - 1; endIndex >= startIndex; endIndex--) {
            if (isPalindrome[startIndex][endIndex]) {
                // we can cut here as we have a palindrome
                // also we don't need any cut if the whole thing is a palindrome
                minimumCuts = endIndex === st.length - 1 ? 0 : Math.min(minimumCuts, 1 + cuts[endIndex + 1]);
            }
        }
        cuts[startIndex] = minimumCuts;
    }

    return cuts[0];
};

console.log(`Minimum palindrome partitions ---> ${findMPPCuts('abdbca')}`);
console.log(`Minimum palindrome partitions ---> ${findMPPCuts('cdpdd')}`);
console.log(`Minimum palindrome partitions ---> ${findMPPCuts('pqr')}`);
console.log(`Minimum palindrome partitions ---> ${findMPPCuts('pp')}`);
console.log(`Minimum palindrome partitions ---> ${findMPPCuts('madam')}`);
