let canPartition = (num) => {
    return canPartitionHelper(num, 0, 0, 0);
};

let canPartitionHelper = (num, currentIndex, sum1, sum2) => {
    // base check
    if (currentIndex === num.length) return Math.abs(sum1 - sum2);

    //recursive call after including the number at the current index in the first set
    const diff1 = canPartitionHelper(num, currentIndex + 1, sum1 + num[currentIndex], sum2);

    //recursive call after including the number at the current index in the second set
    const diff2 = canPartitionHelper(num, currentIndex + 1, sum1, sum2 + num[currentIndex]);

    return Math.min(diff1, diff2);
};

console.log(`Minimum subset difference is: ---> ${canPartition([1, 2, 3, 9])}`);
console.log(`Minimum subset difference is: ---> ${canPartition([1, 2, 7, 1, 5])}`);
console.log(`Minimum subset difference is: ---> ${canPartition([1, 3, 100, 4])}`);
