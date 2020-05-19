## Problem Statement

Given an array of positive numbers, where each element represents the max number of jumps that can be made forward from that element, find the minimum number of jumps needed to reach the end of the array (starting from the first element). If an element is 0, then we cannot move through that element.

Example 1:

```js
Input = {2,1,1,1,4}
Output = 3
Explanation: Starting from index '0', we can reach the last index through: 0->2->3->4
```

Example 2:

```js
Input = {1,1,3,6,9,3,0,1,3}
Output = 4
Explanation: Starting from index '0', we can reach the last index through: 0->1->2->3->8
```

Let's start with a basic brute-force solution:

## Basic Solution:

We will start with the 0th index and try all options. So, if the value of the current index is 'p', we will try every jump in the range (1 to 'p') from that index. After taking a jump, we recursively try all options from that index.

**Code:**

```js
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
```

The time complexity of the above algorithm is O(2^n), where 'n' is the size of the input array. The 'while loop' can execute a maximum number of 'n' times (for the case where we can jump to all the steps ahead) and since in each iteration the function recursively calls itself, therefore, the time complexity is O(2^n). The space complexity is O(n) which is used to store the recursion stack.

We can clearly see the overlapping subproblem pattern. We can optimize this using memoization to store results of subproblems.

## Top-down Dynamic Programming with Memoization

We can use an array to store the already solved subproblems.

**Code:**

```js
const countMinJumps = (jumps) => {
    const dp = [];

    const countMinJumpsHelper = (jumps, currentIndex) => {
        // If we have reached the last index, we don't need any more jumps
        if (currentIndex === jumps.length - 1) return 0;

        // If an element is 0, then we cannot move through that element
        if (jumps[currentIndex] === 0) return Number.MAX_VALUE;

        if (currentIndex in dp) return dp[currentIndex];

        let totalJumps = Number.MAX_VALUE;
        let start = currentIndex + 1;
        let end = currentIndex + jumps[currentIndex];
        while (start <= jumps.length && start <= end) {
            // jump one step and recurse for the remaining array.
            const minJumps = countMinJumpsHelper(jumps, start++);
            if (minJumps !== Number.MAX_VALUE) totalJumps = Math.min(totalJumps, minJumps + 1);
        }
        dp[currentIndex] = totalJumps;
        return dp[currentIndex];
    };

    return countMinJumpsHelper(jumps, 0);
};
console.log(`Minimum jumps needed: ---> ${countMinJumps([2, 1, 1, 1, 4])}`);
console.log(`Minimum jumps needed: ---> ${countMinJumps([1, 1, 3, 6, 9, 3, 0, 1, 3])}`);
```

## Bottom-up Dynamic Programming

Let's try to populate our `dp[]` array from the above solution, working in a bottom-up fashion. As we saw in the above code, we are trying to find the minimum jumps needed to reach every index (if it's within range) from the current index. We can use this fact to populate our array.

As we know, every index within the range of the current index can be reached in one jump. Therefore, we can say that we can reach every index (within the range of current index) in:
`'jumps to reach current index' + 1`

So, while going through all indexes, we will take the minimum value between the current jump count and the jumps needed to reach the currentIndex + 1.

**Code:**

```js
const countMinJumps = (jumps) => {
    const dp = Array(jumps.length).fill(Number.MAX_VALUE);
    dp[0] = 0;

    for (let start = 0; start < jumps.length; start++) {
        for (let end = start + 1; end <= start + jumps[start] && end < jumps.length; end++) {
            dp[end] = Math.min(dp[end], dp[start] + 1);
        }
    }

    return dp[jumps.length - 1];
};
console.log(`Minimum jumps needed: ---> ${countMinJumps([2, 1, 1, 1, 4])}`);
console.log(`Minimum jumps needed: ---> ${countMinJumps([1, 1, 3, 6, 9, 3, 0, 1, 3])}`);
```

The above solution has a time complexity of O(n^2) (because of the two `for` loops) and space complexity of O(n) to store `dp[]`

## Fibonacci Number Pattern

We can clearly see that this problem follows the Fibonacci number pattern. The only difference is that every Fibonacci number is a sum of the two preceding numbers, whereas in this problem every number is the minimum of two numbers (start and end):

`dp[end] = Math.min(dp[end], dp[start] + 1);`
