const countMinJumps = (jumps) => {
    let countMinJumpsHelper = (jumps, currentIndex) => {
        // if we have reached the last index, we don't need more jumps
        if (currentIndex === jumps.length - 1) return 0;

        if (jumps[currentIndex] === 0) return Number.MAX_VALUE;

        let totalJumps = Number.MAX_VALUE;
        let start = currentIndex + 1;
        const end = currentIndex + jumps[currentIndex];

        while (start < jumps.length && start <= end) {
            // jump one step and recurse the remaining array
            const minJumps = countMinJumpsHelper(jumps, start++);
            if (minJumps !== Number.MAX_VALUE) {
                totalJumps = Math.min(totalJumps, minJumps + 1);
            }
        }
        return totalJumps;
    };

    return countMinJumpsHelper(jumps, 0);
};
console.log(`Minimum jumps needed: ---> ${countMinJumps([2, 1, 1, 1, 4])}`);
console.log(`Minimum jumps needed: ---> ${countMinJumps([1, 1, 3, 6, 9, 3, 0, 1, 3])}`);
