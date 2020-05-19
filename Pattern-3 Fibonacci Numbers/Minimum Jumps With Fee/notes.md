## Problem Statement

Given a staircase with ‘n’ steps and an array of ‘n’ numbers representing the fee that you have to pay if you take the step. Implement a method to calculate the minimum fee required to reach the top of the staircase (beyond the top-most step). At every step, you have an option to take either 1 step, 2 steps, or 3 steps. You should assume that you are standing at the first step.

Example 1:

```js
Number of stairs (n) : 6
Fee: {1,2,5,2,1,2}
Output: 3
Explanation: Starting from index '0', we can reach the top through: 0->3->top
The total fee we have to pay will be (1+2).
```

Example 2:

```js
Number of stairs (n): 4
Fee: {2,3,4,5}
Output: 5
Explanation: Starting from index '0', we can reach the top through: 0->1->top
The total fee we have to pay will be (2+3).
```

Let's first start with the recursive brute-force solution

## Basic Solution

At every step, we have three options: either jump 1 step, 2 steps or 3 steps. So our algorithm looks like:

```js
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
```

The time complexity of the above algorithm is exponential `O(3^n)`. The space complexity is `O(n)` which is used to store the recursion stack.

## Top-down Dynamic Programming with Memoization

To resolve overlapping subproblems, we can use an array to store the already solved subproblems. Here is the code:

```js
const findMinFee = (fee) => {
    const dp = [];
    let findMinFeeHelper = (fee, currentIndex) => {
        if (currentIndex > fee.length - 1) return 0;

        // if we take 1 step, we are left with 'n-1' steps;
        const take1Step = findMinFeeHelper(fee, currentIndex + 1);
        // similarly, if we took 2 steps, we are left with 'n-2' steps;
        const take2Step = findMinFeeRecursive(fee, currentIndex + 2);
        // if we took 3 steps, we are left with 'n-3' steps;
        const take3Step = findMinFeeRecursive(fee, currentIndex + 3);

        dp[currentIndex] = fee[currentIndex] + Math.min(take1Step, take2Step, take3Step);

        return dp[currentIndex];
    };
    return findMinFeeHelper(fee, 0);
};
console.log(`Minimum fee needed: ---> ${findMinFee([1, 2, 5, 2, 1, 2])}`);
console.log(`Minimum fee needed: ---> ${findMinFee([2, 3, 4, 5])}`);
```

## Bottom-up Dynamic Programming

Let's try to populate our `dp[]` array from the above solution, working in a bottom-up fashion. As we saw in the above code, every `findMinFeeHelper(n)` is the minimum of the three recursive calls; we can use this fact to populate our array.

**Code:**

```js
const findMinFee = (fee) => {
    const dp = Array(fee.length + 1).fill(0);

    dp[0] = 0; // if there are no steps, we dont have to pay any fee
    dp[1] = fee[0]; // only one step, so we have to pay its fee

    // for 2 steps, since we start from the first step, so we have to pay its fee
    // and from the first step we can reach the top by taking two steps, so
    // we dont have to pay any other fee.
    dp[2] = fee[0];

    // please note that dp[] has one extra element to handle the 0th step
    for (let i = 2; i < fee.length; i++) {
        dp[i + 1] = Math.min(fee[i] + dp[i], fee[i - 1] + dp[i - 1], fee[i - 2] + dp[i - 2]);
    }

    return dp[fee.length];
};

console.log(`Minimum fee needed: ---> ${findMinFee([1, 2, 5, 2, 1, 2])}`);
console.log(`Minimum fee needed: ---> ${findMinFee([2, 3, 4, 5])}`);
```

The above solution has time and space complexity of O(n).

## Fibonacci Number Pattern

We can clearly see that this problem follows the Fibonacci number pattern. The only difference is that every Fibonacci number is a sum of the two preceding numbers, whereas in this problem every number (total fee) is the minimum of previous three numbers.
