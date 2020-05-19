## Problem Statement

Given a stair with 'n' steps, implement a method to count how many possible ways are there to reach the top of the staircase, given that, at every step you can either take 1 step, 2 steps or 3 steps.

Example 1:

```js
Number of stairs (n) : 3
Number of ways = 4
Explanation: Following are the four ways we can climb : {1,1,1}, {1,2}, {2,1}, {3}
```

Example 2:

```js
Number of stairs (n) : 4
Number of ways = 7
Explanation: Following are the seven ways we can climb : {1,1,1,1}, {1,1,2}, {1,2,1}, {2,1,1}, {2,2}, {1,3}, {3,1}
```

Let’s first start with a recursive brute-force solution.

## Basic Solution

At every step, we have three options: either jump 1 step, 2 steps or 3 steps. So our algorithm will look like this:

```js
const countWays = (n) => {
    // base case, we don't need to take any step, so there is only one way
    if (n === 0) return 1;

    // we can take one step to reach the end, and that is the only way
    if (n === 1) return 1;

    // we can take one step twice or jump two steps to reach at the top
    if (n === 2) return 2;

    // if we take 1 step, we are left with n-1 steps
    const take1Step = countWays(n - 1);

    // similarly, if we took 2 steps, we are left with 'n-2' steps;
    const take2Step = countWays(n - 2);

    // if we took 3 steps, we are left with 'n-3' steps;
    const take3Step = countWays(n - 3);

    return take1Step + take2Step + take3Step;
};
console.log(`Number of ways: ---> ${countWays(3)}`);
console.log(`Number of ways: ---> ${countWays(4)}`);
console.log(`Number of ways: ---> ${countWays(5)}`);
```

The time complexity of the above algorithm is exponential `O(3^n)` as we are making three recursive call in the same function. The space complexity is `O(n)` which is used to store the recursion stack.

Let's visually draw the recursion for `countWays(4)` to see the overlapping subproblems

We can clearly see the overlapping subproblem pattern: `countWays(2)` and `countWays(1)` have been called twice. We can optimize using memoization.

## Top-Down Dynamic Programming with Memoization

We can use an array to store the already solved subproblems. Here is the code:

```js
const countWays = (n) => {
    const dp = [];

    const countWaysRecursive = (n) => {
        // base case, we don't need to take any step, so there is only one way
        if (n === 0) return 1;

        // we can take one step to reach the end, and that is the only way
        if (n === 1) return 1;

        // we can take one step twice or jump two steps to reach at the top
        if (n === 2) return 2;

        if (n in dp) return dp[n];

        // if we take 1 step, we are left with 'n-1' steps;
        const take1Step = countWaysRecursive(n - 1);

        // similarly, if we took 2 steps, we are left with 'n-2' steps;
        const take2Step = countWaysRecursive(n - 2);

        // if we took 3 steps, we are left with 'n-3' steps;
        const take3Step = countWaysRecursive(n - 3);

        dp[n] = take1Step + take2Step + take3Step;

        return dp[n];
    };

    return countWaysRecursive(n);
};

console.log(`Number of ways: ---> ${countWays(3)}`);
console.log(`Number of ways: ---> ${countWays(4)}`);
console.log(`Number of ways: ---> ${countWays(5)}`);
```

Since our memoization array `dp[n+1]` stores the results for all the subproblems, we can conclude that we will not have more than n+1 subproblems (where ‘n’ represents the total number of steps). This means that our time complexity will be O(N). The space complexity will also be O(n); this space will be used to store the recursion-stack.

## Bottom-up Dyanmic Programming

Let’s try to populate our `dp[]` array from the above solution, working in a bottom-up fashion. As we saw in the above code, every `countWaysRecursive(n)` is the sum of the previous three counts. We can use this fact to populate our array.

**Code:**

```js
const countWays = (n) => {
    const dp = Array(n + 1).fill(0);
    dp[0] = 1;
    dp[1] = 1;
    dp[2] = 2;

    for (let i = 3; i <= n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2] + dp[i - 3];
    }

    return dp[n];
};

console.log(`Number of ways: ---> ${countWays(3)}`);
console.log(`Number of ways: ---> ${countWays(4)}`);
console.log(`Number of ways: ---> ${countWays(5)}`);
```

The above solution has time and space complexity of O(n).

## Memory Optimization

We can optimize the space used in our previous solution. We don’t need to store all the counts up to ‘n’, as we only need three previous numbers to calculate the next count. We can use this fact to further improve our solution:

```js
const countWays = function (n) {
    if (n < 2) return 1;
    if (n == 2) return 2;

    let n1 = 1,
        n2 = 1,
        n3 = 2;

    for (let i = 3; i <= n; i++) {
        let temp = n1 + n2 + n3;
        n1 = n2;
        n2 = n3;
        n3 = temp;
    }

    return n3;
};

console.log(`Number of ways: ---> ${countWays(3)}`);
console.log(`Number of ways: ---> ${countWays(4)}`);
console.log(`Number of ways: ---> ${countWays(5)}`);
```

The above solution has a time complexity of O(n) and a constant space complexity O(1).
