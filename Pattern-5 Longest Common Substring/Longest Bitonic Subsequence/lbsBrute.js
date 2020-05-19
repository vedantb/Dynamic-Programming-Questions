const findLBSLength = (nums) => {
  let maxLength = 0;
  for (let i = 0; i < nums.length; i++) {
    const c1 = findLDSLength(nums, i, -1);
    const c2 = findLDSLengthRev(nums, i, -1);
    maxLength = Math.max(maxLength, c1 + c2 - 1);
  }
  return maxLength;
};

// find the longest decreasing subsequence from currentIndex till the end of the array
let findLDSLength = (nums, currentIndex, previousIndex) => {
  if (currentIndex === nums.length) return 0;

  // include nums[currentIndex] if it is smaller than the previous number
  let c1 = 0;
  if (previousIndex == -1 || nums[currentIndex] < nums[previousIndex]) {
    c1 = 1 + findLDSLength(nums, currentIndex + 1, currentIndex);
  }

  // excluding the number at currentIndex
  const c2 = findLDSLength(nums, currentIndex + 1, previousIndex);

  return Math.max(c1, c2);
};

// find the longest decreasing subsequence from currentIndex till the beginning of the array
const findLDSLengthRev = (nums, currentIndex, previousIndex) => {
  if (currentIndex < 0) return 0;

  // include nums[currentIndex] if it is smaller than the previous number
  let c1 = 0;
  if (previousIndex == -1 || nums[currentIndex] < nums[previousIndex]) {
    c1 = 1 + findLDSLengthRev(nums, currentIndex - 1, currentIndex);
  }

  // excluding the number at currentIndex
  const c2 = findLDSLengthRev(nums, currentIndex - 1, previousIndex);

  return Math.max(c1, c2);
};

console.log(`Length of Longest Bitonic Subsequence: ---> ${findLBSLength([4, 2, 3, 6, 10, 1, 12])}`);
console.log(`Length of Longest Bitonic Subsequence: ---> ${findLBSLength([4, 2, 5, 9, 7, 6, 10, 3, 1])}`);
