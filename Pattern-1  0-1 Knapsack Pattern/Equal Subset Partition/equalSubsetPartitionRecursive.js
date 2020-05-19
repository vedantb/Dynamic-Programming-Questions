let canPartitionRecursive = function (num) {
    let sum = 0;
    for (let i = 0; i < num.length; i++) sum += num[i];

    // if sum is an odd number we can't have two subsets with equal sum
    if (sum % 2 !== 0) return false;

    let canPartitionRecursiveHelper = function (sum, currentIndex) {
        // base check
        if (sum === 0) return true;

        if (num.length === 0 || currentIndex >= num.length) return false;

        // recursive call after choosing the number at the currentIndex
        // if the number at currentIndex exceeds the sum, we shouldn't process this
        if (num[currentIndex] <= sum) {
            if (canPartitionRecursiveHelper(sum - num[currentIndex], currentIndex + 1)) return true;
        }

        // recursive call after excluding the number at the currentIndex
        return canPartitionRecursiveHelper(sum, currentIndex + 1);
    };

    return canPartitionRecursiveHelper(sum / 2, 0);
};

console.log(`Can partitioning be done: ---> ${canPartitionRecursive([1, 2, 3, 4])}`);
console.log(`Can partitioning be done: ---> ${canPartitionRecursive([1, 1, 3, 4, 7])}`);
console.log(`Can partitioning be done: ---> ${canPartitionRecursive([2, 3, 4, 6])}`);
console.log(`Can partitioning be done: ---> ${canPartitionRecursive([8, 8, 2])}`);
