let findLASLength = (nums) => {
  let findLASLengthHelper = (nums, previousIndex, currentIndex, isAsc) => {
    if (currentIndex === nums.length) return 0;

    let c1 = 0;
    // if ascending, the next element should be bigger
    if (isAsc) {
      if (previousIndex === -1 || nums[previousIndex] < nums[currentIndex])
        c1 = 1 + findLASLengthHelper(nums, currentIndex, currentIndex + 1, !isAsc);
    } else {
      // if descending, the next element should be smaller
      if (previousIndex === -1 || nums[previousIndex] > nums[currentIndex])
        c1 = 1 + findLASLengthHelper(nums, currentIndex, currentIndex + 1, !isAsc);
    }

    // skip the current element
    let c2 = findLASLengthHelper(nums, previousIndex, currentIndex + 1, isAsc);
    return Math.max(c1, c2);
  };
  return Math.max(findLASLengthHelper(nums, -1, 0, true), findLASLengthHelper(nums, -1, 0, false));
};

console.log(`Length of Longest Alternating Subsequence: ---> ${findLASLength([1, 2, 3, 4])}`);
console.log(`Length of Longest Alternating Subsequence: ---> ${findLASLength([3, 2, 1, 4])}`);
console.log(`Length of Longest Alternating Subsequence: ---> ${findLASLength([1, 3, 2, 4])}`);
