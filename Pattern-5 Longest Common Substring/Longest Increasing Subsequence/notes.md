## Problem Statement

Given a number sequence, find the length of its Longest Increasing Subsequence (LIS). In an increasing subsequence, all the elements are in increasing order (from lowest to highest).

Example 1:

```js
Input: {4,2,3,6,10,1,12}
Output: 5
Explanation: The LIS is {2,3,6,10,12}.
```

Example 2:

```js
Input: {-4,10,3,7,15}
Output: 4
Explanation: The LIS is {-4,3,7,15}.
```

## Basic Solution

A basic brute-force solution could be to try all the subsequences of the given number sequence. We can process one number at a time, so we have two options at any step:

1. If the current number is greater than the previous number that we included, we can increment our count and make a recursive call for the remaining array.
2. We can skip the current number to make a recursive call for the remaining array.

The length of the longest increasing subsequence will be the maximum number returned by the two recurse calls from the above two options.

```js
const findLISLength = (nums) => {
    let findLISLengthHelper = (nums, currentIndex, previousIndex) => {
        if (currentIndex === nums.length) return 0;

        // include nums[currentIndex] if it is larger than the last included number
        let c1 = 0;
        if (previousIndex === -1 || nums[currentIndex] > nums[previousIndex]) {
            c1 = 1 + findLISLengthHelper(nums, currentIndex + 1, currentIndex);
        }

        // excluding the number at currentIndex
        const c2 = findLISLengthHelper(nums, currentIndex + 1, previousIndex);

        return Math.max(c1, c2);
    };

    return findLISLengthHelper(nums, 0, -1);
};

console.log(`Length of Longest Increasing Subsequence: ---> ${findLISLength([4, 2, 3, 6, 10, 1, 12])}`);
console.log(`Length of Longest Increasing Subsequence: ---> ${findLISLength([-4, 10, 3, 7, 15])}`);
```

The time complexity of the above algorithm is exponential O(2^n), where ‘n’ is the lengths of the input array. The space complexity is O(n) which is used to store the recursion stack.

## Top-down Dynamic Programming with Memoization

To overcome the overlapping subproblems, we can use an array to store the already solved subproblems.

The two changing values for our recursive function are the current and the previous index. Therefore, we can store the results of all subproblems in a two-dimensional array.

**Code:**

```js
const findLISLength = (nums) => {
    const dp = [];
    let findLISLengthHelper = (nums, currentIndex, previousIndex) => {
        if (currentIndex === nums.length) return 0;

        dp[currentIndex] = dp[currentIndex] || [];

        if (previousIndex + 1 in dp[currentIndex]) return dp[currentIndex][previousIndex + 1];

        // include nums[currentIndex] if it is larger than the last included number
        let c1 = 0;
        if (previousIndex === -1 || nums[currentIndex] > nums[previousIndex]) {
            c1 = 1 + findLISLengthHelper(nums, currentIndex + 1, currentIndex);
        }

        // excluding the number at currentIndex
        const c2 = findLISLengthHelper(nums, currentIndex + 1, previousIndex);

        dp[currentIndex][previousIndex + 1] = Math.max(c1, c2);
        return dp[currentIndex][previousIndex + 1];
    };

    return findLISLengthHelper(nums, 0, -1);
};

console.log(`Length of Longest Increasing Subsequence: ---> ${findLISLength([4, 2, 3, 6, 10, 1, 12])}`);
console.log(`Length of Longest Increasing Subsequence: ---> ${findLISLength([-4, 10, 3, 7, 15])}`);
```

Since our memoization array dp[nums.length()][nums.length()] stores the results for all the subproblems, we can conclude that we will not have more than `N*N` subproblems (where ‘N’ is the length of the input sequence). This means that our time complexity will be O(N^2).

The above algorithm will be using O(N^2) space for the memoization array. Other than that we will use O(N) space for the recursion call-stack. So the total space complexity will be O(N^2 + N), which is asymptotically equivalent to O(N^2).

## Bottom-up Dynamic Programming

The above algorithm tells us two things:

1. If the number at the current index is bigger than the number at the previous index, we increment the count for LIS up to the current index.
2. But if there is a bigger LIS without including the number at current index, we take that

So we need to find all the increasing subsequences for the number at index ‘i’, from all the previous numbers (i.e. number till index ‘i-1’), to eventually find the longest increasing subsequence.

If ‘i’ represents the ‘currentIndex’ and ‘j’ represents the ‘previousIndex’, our recursive formula would look like:

```js
if num[i] > num[j] => dp[i] = dp[j] + 1 if there is no bigger LIS for 'i'
```

Let’s draw this visually for {-4,10,3,7,15}. Start with a subsequence of length ‘1’, as every number will be a LIS of length ‘1’:

![alt text](https://imgur.com/Re8eyMx.png 'LIS')

`i:1, j:0 => Since num[i] > num[j] and dp[i] <=dp[j], therefore dp[i] = dp[j]+1`

![alt text](https://imgur.com/PXTOw3N.png 'LIS')

`i:2, j:0 => Since num[i] > num[j] and dp[i] <=dp[j], therefore dp[i] = dp[j]+1`

![alt text](https://imgur.com/Q2TMPhw.png 'LIS')

`i:2, j:1 => Since num[i] < num[j] so no update`

![alt text](https://imgur.com/znQcXN7.png 'LIS')

`i:3, j:0 => Since num[i] > num[j] and dp[i] <=dp[j], therefore dp[i] = dp[j]+1`

![alt text](https://imgur.com/PSg9qbL.png 'LIS')

`i:3, j:1 => Since num[i] < num[j], so no update`

![alt text](https://imgur.com/fLGBNbm.png 'LIS')

`i:3, j:2 => Since num[i] > num[j] and dp[i] <=dp[j], therefore dp[i] = dp[j]+1`

![alt text](https://imgur.com/NmA2Fb7.png 'LIS')

`i:4, j:0 => Since num[i] > num[j] and dp[i] <=dp[j], therefore dp[i] = dp[j]+1`

![alt text](https://imgur.com/kV74uhq.png 'LIS')

`i:4, j:1 => Since num[i] > num[j] and dp[i] <=dp[j], therefore dp[i] = dp[j]+1`

![alt text](https://imgur.com/ov2Ot4S.png 'LIS')

`i:4, j:2 => Since num[i] > num[j] but dp[i] >dp[j], so no update`

![alt text](https://imgur.com/aMYmcBZ.png 'LIS')

`i:4, j:3 => Since num[i] > num[j] and dp[i] <=dp[j], therefore dp[i] = dp[j]+1`

![alt text](https://imgur.com/JXW3eDA.png 'LIS')

From the above visualization, we can clearly see that the longest increasing subsequence is of length ‘4’ – as shown by `dp[4]`.

**Code:**

```js
const findLISLength = (nums) => {
    const dp = Array(nums.length).fill(0);
    dp[0] = 1;

    let maxLength = 1;
    for (let i = 1; i < nums.length; i++) {
        dp[i] = 1;
        for (let j = 0; j < i; j++) {
            if (nums[i] > nums[j] && dp[i] <= dp[j]) {
                dp[i] = dp[j] + 1;
                maxLength = Math.max(maxLength, dp[i]);
            }
        }
    }
    return maxLength;
};

console.log(`Length of Longest Increasing Subsequence: ---> ${findLISLength([4, 2, 3, 6, 10, 1, 12])}`);
console.log(`Length of Longest Increasing Subsequence: ---> ${findLISLength([-4, 10, 3, 7, 15])}`);
```

The time complexity of the above algorithm is O(n^2) and the space complexity is O(n).
