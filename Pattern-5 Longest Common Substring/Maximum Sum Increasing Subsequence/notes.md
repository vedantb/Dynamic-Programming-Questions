## Problem Statement

Given a number sequence, find the increasing subsequence with the highest sum. Write a method that returns the highest sum.

Example 1:

```js
Input: {4,1,2,6,10,1,12}
Output: 32
Explanation: The increaseing sequence is {4,6,10,12}.
Please note the difference, as the LIS is {1,2,6,10,12} which has a sum of '31'.
```

Example 2:

```js
Input: {-4,10,3,7,15}
Output: 25
Explanation: The increaseing sequences are {10, 15} and {3,7,15}.
```

## Basic Solution

The problem is quite similar to the Longest Increasing Subsequence. The only difference is that, instead of finding the increasing subsequence with the maximum length, we need to find an increasing sequence with the maximum sum.

A basic brute-force solution could be to try all the subsequences of the given array. We can process one number at a time, so we have two options at any step:

1. If the current number is greater than the previous number that we included, we include that number in a running sum and make a recursive call for the remaining array.

2. We can skip the current number to make a recursive call for the remaining array.

The highest sum of any increasing subsequence would be the max value returned by the two recurse calls from the above two options.

**Code:**

```js
const findMSIS = (nums) => {
    const findMSISHelper = (nums, currentIndex, previousIndex, sum) => {
        if (currentIndex === nums.length) return sum;

        // include nums[currentIndex] if its larger than the last included number
        let s1 = sum;
        if (previousIndex === -1 || nums[currentIndex] > nums[previousIndex]) {
            s1 = findMSISHelper(nums, currentIndex + 1, currentIndex, sum + nums[currentIndex]);
        }

        // exclude the number at currentIndex
        const s2 = findMSISHelper(nums, currentIndex + 1, previousIndex, sum);

        return Math.max(s1, s2);
    };
    return findMSISHelper(nums, 0, -1, 0);
};

console.log(`Maximum Sum Increasing Subsequence is: ---> ${findMSIS([4, 1, 2, 6, 10, 1, 12])}`);
console.log(`Maximum Sum Increasing Subsequence is: ---> ${findMSIS([-4, 10, 3, 7, 15])}`);
```

The time complexity of the above algorithm is exponential O(2^n), where ‘n’ is the lengths of the input array. The space complexity is O(n) which is used to store the recursion stack.

## Top-down Dynamic Programming with Memoization

We can use memoization to overcome the overlapping subproblems.

The three changing values for our recursive function are the current index, the previous index, and the sum. An efficient way of storing the results of the subproblems could be a hash-table whose key would be a string (currentIndex + “|” + previousIndex + “|” + sum).

**Code:**

```js
const findMSIS = (nums) => {
    const dp = {};
    const findMSISHelper = (nums, currentIndex, previousIndex, sum) => {
        if (currentIndex === nums.length) return sum;

        const subProblemKey = `${currentIndex}-${previousIndex}-${sum}`;

        if (subProblemKey in dp) return dp[subProblemKey];

        // include nums[currentIndex] if its larger than the last included number
        let s1 = sum;
        if (previousIndex === -1 || nums[currentIndex] > nums[previousIndex]) {
            s1 = findMSISHelper(nums, currentIndex + 1, currentIndex, sum + nums[currentIndex]);
        }

        // exclude the number at currentIndex
        const s2 = findMSISHelper(nums, currentIndex + 1, previousIndex, sum);

        dp[subProblemKey] = Math.max(s1, s2);
        return dp[subProblemKey];
    };
    return findMSISHelper(nums, 0, -1, 0);
};

console.log(`Maximum Sum Increasing Subsequence is: ---> ${findMSIS([4, 1, 2, 6, 10, 1, 12])}`);
console.log(`Maximum Sum Increasing Subsequence is: ---> ${findMSIS([-4, 10, 3, 7, 15])}`);
```

## Bottom-up Dynamic Programming

The above algorithm tells us two things:

1.  the number at the current index is bigger than the number at the previous index, we include that number in the sum for an increasing sequence up to the current index.

2.  But if there is a maximum sum increasing subsequence (MSIS), without including the number at the current index, we take that.

So we need to find all the increasing subsequences for a number at index `i`, from all the previous numbers (i.e. numbers till index `i-1`), to find MSIS.

If `i` represents the currentIndex and `j` represents the previousIndex, our recursive formula would look like:

```js
if num[i] > num[j] => dp[i] = dp[j] + num[i] if there is no bigger MSIS for 'i'
```

Let’s draw this visually for {-4,10,3,7,15}. Start with a subsequence of length ‘1’, as every number can represent an MSIS:

![alt text](https://imgur.com/T31I7dn.png 'MSIS')

`i:1, j:0 => Since num[i] > num[j] but dp[i] > dp[j]+ nums[i], therefore no update`

![alt text](https://imgur.com/2uLxBe3.png 'MSIS')

`i:2, j:0 => Since num[i] > num[j] but dp[i] > dp[j]+ nums[i], therefore no update`

![alt text](https://imgur.com/sMw0YuL.png 'MSIS')

`i:2, j:1 => Since num[i] < num[j], therefore no update`

![alt text](https://imgur.com/6TrftTG.png 'MSIS')

`i:3, j:0 => Since num[i] > num[j] but dp[i] > dp[j]+ nums[i], therefore no update`

![alt text](https://imgur.com/ZoZ9USp.png 'MSIS')

`i:3, j:1 => Since num[i] < num[j], therefore no update`

![alt text](https://imgur.com/zcHIf20.png 'MSIS')

`i:3, j:2 => Since num[i] > num[j] and dp[i] < dp[j] + num[i], therefore dp[i] = dp[j] + num[i]`

![alt text](https://imgur.com/dSWCP72.png 'MSIS')

`i:4, j:0 => Since num[i] > num[j] but dp[i] > dp[j]+ nums[i], therefore no update`

![alt text](https://imgur.com/1Uo51qP.png 'MSIS')

`i:4, j:1 => Since num[i] > num[j] and dp[i] < dp[j] + num[i], therefore dp[i] = dp[j] + num[i]`

![alt text](https://imgur.com/JyAs31W.png 'MSIS')

`i:4, j:2 => Since num[i] > num[j] but dp[i] > dp[j]+ nums[i], therefore no update`

![alt text](https://imgur.com/XgASwn0.png 'MSIS')

`i:4, j:3 => Since num[i] > num[j] but dp[i] == dp[j]+ nums[i], therefore no update`

![alt text](https://imgur.com/68D5WSg.png 'MSIS')

**Code:**

```js
const findMSIS = (nums) => {
    const dp = Array(nums.length).fill(0);
    dp[0] = nums[0];

    let maxSum = nums[0];

    for (let i = 1; i < nums.length; i++) {
        dp[i] = nums[i];
        for (let j = 0; j < i; j++) {
            if (nums[i] > nums[j] && dp[i] < dp[j] + nums[i]) dp[i] = dp[j] + nums[i];
        }
        maxSum = Math.max(maxSum, dp[i]);
    }

    return maxSum;
};

console.log(`Maximum Sum Increasing Subsequence is: ---> ${findMSIS([4, 1, 2, 6, 10, 1, 12])}`);
console.log(`Maximum Sum Increasing Subsequence is: ---> ${findMSIS([-4, 10, 3, 7, 15])}`);
console.log(
    'Maximum Sum Increasing Subsequence is: ---> ' + findMSIS([1, 3, 8, 4, 14, 6, 14, 1, 9, 4, 13, 3, 11, 17, 29])
);
```

The time complexity of the above algorithm is O(n^2) and the space complexity is O(n).
