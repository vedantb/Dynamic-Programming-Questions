const countMinJumps = (jumps) => {
    const dp = [];

    const countMinJumpsHelper = (jumps, currentIndex) => {
        // If we have reached the last index, we don't need any more jumps
        if (currentIndex === jumps.length - 1) return 0;

        // If an element is 0, then we cannot move through that element
        if (jumps[currentIndex] === 0) return Number.MAX_VALUE;

        if (currentIndex in dp) return dp[currentIndex];

        let totalJumps = Number.MAX_VALUE;
        let start = currentIndex + 1;
        let end = currentIndex + jumps[currentIndex];
        while (start <= jumps.length && start <= end) {
            // jump one step and recurse for the remaining array.
            const minJumps = countMinJumpsHelper(jumps, start++);
            if (minJumps !== Number.MAX_VALUE) totalJumps = Math.min(totalJumps, minJumps + 1);
        }
        dp[currentIndex] = totalJumps;
        return dp[currentIndex];
    };

    return countMinJumpsHelper(jumps, 0);
};
console.log(`Minimum jumps needed: ---> ${countMinJumps([2, 1, 1, 1, 4])}`);
console.log(`Minimum jumps needed: ---> ${countMinJumps([1, 1, 3, 6, 9, 3, 0, 1, 3])}`);
