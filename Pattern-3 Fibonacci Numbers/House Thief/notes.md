There are 'n' houses built in a line. A thief wants to steal maximum possible money from these houses. The only restriction the thief has is that he can't steal from two consecutive houses, as that would alert the security system. How should the thief maximize his stealing.

## Problem Statement

Given a number array representing the wealth of 'n' houses, determine the maximum amount of money the thief can steal without alerting the security system.

Example 1:

```js
Input: {2, 5, 1, 3, 6, 2, 4}
Output: 15
Explanation: The thief should steal from houses 5 + 6 + 4
```

Example 2:

```js
Input: {2, 10, 14, 8, 1}
Output: 18
Explanation: The thief should steal from houses 10 + 8
```

Let's first start with a recursive brute-force solution.

## Basic Solution

For every house 'i', we have two options:

1. Steal from the current house 'i', skip one and steal from ('i + 2')
2. Skip the current house ('i'), and steal from the adjacent house ('i + 1')

The thief should choose the one with the maximum amount from the above two options. So our algorithm will look like:

```js
const findMaxSteal = (wealth) => {
    const findMaxStealHelper = (wealth, currentIndex) => {
        if (currentIndex >= wealth.length) return 0;

        // steal from current house and skip one to steal from next house
        const stealCurrent = wealth[currentIndex] + findMaxStealHelper(wealth, currentIndex + 2);

        // skip current house to steal from the adjacent house
        const skipCurrent = findMaxStealHelper(wealth, currentIndex + 1);

        return Math.max(stealCurrent, skipCurrent);
    };

    return findMaxStealHelper(wealth, 0);
};

console.log(`Maximum stealing: ---> ${findMaxSteal([2, 5, 1, 3, 6, 2, 4])}`);
console.log(`Maximum stealing: ---> ${findMaxSteal([2, 10, 14, 8, 1])}`);
```

The time complexity of the above algorithm is exponential O(2^n). The space complexity is O(n) which is used to store the recursion stack.

## Top-down Dynamic Programming with Memoization

To resolve overlapping subproblems, we can use an array to store the already solved subproblems.

Here is the code:

```js
const findMaxSteal = (wealth) => {
    const dp = [];
    const findMaxStealHelper = (wealth, currentIndex) => {
        if (currentIndex >= wealth.length) return 0;

        if (currentIndex in dp) return dp[currentIndex];

        // steal from current house and skip one to steal from next house
        const stealCurrent = wealth[currentIndex] + findMaxStealHelper(wealth, currentIndex + 2);

        // skip current house to steal from the adjacent house
        const skipCurrent = findMaxStealHelper(wealth, currentIndex + 1);

        dp[currentIndex] = Math.max(stealCurrent, skipCurrent);

        return dp[currentIndex];
    };

    return findMaxStealHelper(wealth, 0);
};

console.log(`Maximum stealing: ---> ${findMaxSteal([2, 5, 1, 3, 6, 2, 4])}`);
console.log(`Maximum stealing: ---> ${findMaxSteal([2, 10, 14, 8, 1])}`);
```

## Bottom-up Dynamic Programming

Let's try to populate our `dp[]` array from the above solution, working in a bottom-up fashion. As we saw in the above code, every `fixMaxStealHelper(n)` is the maximum of two recursive calls; we can use this fact to populate our array

**Code:**

```js
const findMaxSteal = (wealth) => {
    if (wealth.length === 0) return 0;

    const dp = Array(wealth.length + 1).fill(0);

    dp[0] = 0; // can't steal anything if there are no houses
    dp[1] = wealth[0]; // only one house so thief steals from it

    // please note that dp[] has one extra element to handle zero house
    for (let i = 1; i < wealth.length; i++) {
        dp[i + 1] = Math.max(wealth[i] + dp[i - 1], dp[i]);
    }

    return dp[wealth.length];
};
console.log(`Maximum stealing: ---> ${findMaxSteal([2, 5, 1, 3, 6, 2, 4])}`);
console.log(`Maximum stealing: ---> ${findMaxSteal([2, 10, 14, 8, 1])}`);
```

The above solution has time and space complexity of O(n).

## Memory Optimization

We can optimize the space used in our previous solution. We don’t need to store all the previous numbers up to ‘n’, as we only need two previous numbers to calculate the next number in the sequence. Let's use this fact to further improve our solution

```js
const findMaxSteal = function (wealth) {
    if (wealth.length == 0) return 0;
    let n1 = 0,
        n2 = wealth[0];

    for (let i = 1; i < wealth.length; i++) {
        let temp = Math.max(n1 + wealth[i], n2);
        n1 = n2;
        n2 = temp;
    }
    return n2;
};

console.log(`Maximum stealing: ---> ${findMaxSteal([2, 5, 1, 3, 6, 2, 4])}`);
console.log(`Maximum stealing: ---> ${findMaxSteal([2, 10, 14, 8, 1])}`);
```

The above solution has a time complexity of O(n) and a constant space complexity O(1).

## Fibonacci Number Pattern

We can clearly see that this problem follows the Fibonacci number pattern. The only difference is that every Fibonacci number is a sum of the two preceding numbers, whereas in this problem every number (total wealth) is the maximum of previous two numbers.
