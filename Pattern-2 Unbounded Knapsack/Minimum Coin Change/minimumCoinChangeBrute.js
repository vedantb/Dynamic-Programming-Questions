let countChange = (denominations, total) => {
    let coinChangeHelper = (denominations, total, currentIndex) => {
        // base check
        if (total === 0) return 0;

        if (denominations.length === 0 || currentIndex >= denominations.length) return Number.MAX_VALUE;

        // recursive call after selecting the coin at the currentIndex
        //  if the coin at the currentIndex exceeds the total, we shouldn't process this
        let count1 = Number.MAX_VALUE;
        if (denominations[currentIndex] <= total) {
            const res = coinChangeHelper(denominations, total - denominations[currentIndex], currentIndex);
            if (res !== Number.MAX_VALUE) count1 = res + 1;
        }

        const count2 = coinChangeHelper(denominations, total, currentIndex + 1);

        return Math.min(count1, count2);
    };

    const result = coinChangeHelper(denominations, total, 0);
    return result === Number.MAX_VALUE ? -1 : result;
};

console.log(`Number of ways to make change: ---> ${countChange([1, 2, 3], 5)}`);
console.log(`Number of ways to make change: ---> ${countChange([1, 2, 3], 11)}`);
console.log(`Number of ways to make change: ---> ${countChange([1, 2, 3], 7)}`);
console.log(`Number of ways to make change: ---> ${countChange([3, 5], 7)}`);
