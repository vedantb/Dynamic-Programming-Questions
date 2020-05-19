const findLBSLength = (nums) => {
  const lds = Array(nums.length).fill(0);
  const ldsReverse = Array(nums.length).fill(0);

  // find LDS for every index up to the beginning of the array
  for (let i = 0; i < nums.length; i++) {
    lds[i] = 1; // every element is an LDS of length 1
    for (let j = i - 1; j >= 0; j--)
      if (nums[j] < nums[i]) {
        lds[i] = Math.max(lds[i], lds[j] + 1);
      }
  }

  // find LDS for every index up to the end of the array
  for (let i = nums.length - 1; i >= 0; i--) {
    ldsReverse[i] = 1; // every element is an LDS of length 1
    for (let j = i + 1; j < nums.length; j++)
      if (nums[j] < nums[i]) {
        ldsReverse[i] = Math.max(ldsReverse[i], ldsReverse[j] + 1);
      }
  }

  let maxLength = 0;
  for (let i = 0; i < nums.length; i++) {
    maxLength = Math.max(maxLength, lds[i] + ldsReverse[i] - 1);
  }

  return maxLength;
};

console.log(`Length of Longest Bitonic Subsequence: ---> ${findLBSLength([4, 2, 3, 6, 10, 1, 12])}`);
console.log(`Length of Longest Bitonic Subsequence: ---> ${findLBSLength([4, 2, 5, 9, 7, 6, 10, 3, 1])}`);
