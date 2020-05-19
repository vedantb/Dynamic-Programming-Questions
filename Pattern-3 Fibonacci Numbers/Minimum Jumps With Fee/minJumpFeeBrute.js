const findMinFee = (fee) => {
    let findMinFeeHelper = (fee, currentIndex) => {
        if (currentIndex > fee.length - 1) return 0;

        // if we take 1 step, we are left with 'n-1' steps;
        const take1Step = findMinFeeHelper(fee, currentIndex + 1);
        // similarly, if we took 2 steps, we are left with 'n-2' steps;
        const take2Step = findMinFeeRecursive(fee, currentIndex + 2);
        // if we took 3 steps, we are left with 'n-3' steps;
        const take3Step = findMinFeeRecursive(fee, currentIndex + 3);

        const min = Math.min(take1Step, take2Step, take3Step);

        return min + fee[currentIndex];
    };
    return findMinFeeHelper(fee, 0);
};
console.log(`Minimum fee needed: ---> ${findMinFee([1, 2, 5, 2, 1, 2])}`);
console.log(`Minimum fee needed: ---> ${findMinFee([2, 3, 4, 5])}`);
