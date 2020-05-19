## Problem Statement

Write a function to calculate the nth Fibonacci number.

Fibonacci numbers are a series of numbers in which each number is the sum of the two preceding numbers. First few Fibonacci numbers are: 0, 1, 1, 2, 3, 5, 8, …

Mathematically we can define the Fibonacci numbers as:

```js
Fib(n) = Fib(n-1) + Fib(n-2), for n > 1

Given that: Fib(0) = 0, and Fib(1) = 1
```

## Basic Solution

A basic solution could be to have a recursive implementation of the mathematical formula discussed above:

```js
const calculateFibonacci = function (n) {
    if (n < 2) return n;

    return calculateFibonacci(n - 1) + calculateFibonacci(n - 2);
};

console.log(`5th Fibonacci is ---> ${calculateFibonacci(5)}`);
console.log(`6th Fibonacci is ---> ${calculateFibonacci(6)}`);
```

The time complexity of the above algorithm is exponential `O(2^n)` as we are making two recursive calls in the same function. The space complexity is `O(n)` which is used to store the recursion stack.

Let's visually draw the recursion for `CalculateFibonacci(4)` to see the overlapping subproblems

We can clearly see the overlapping subproblem pattern: `fib(2)` has been called twice and `fib(1)` has been called thrice. We can optimize this using memoization to store the results for subproblems.

## Top-Down Dynamic Programming with Memoization

We can use an array to store the already solved subproblems. Here is the code:

```js
const calculateFibonacci = function (n) {
    const memoize = [];

    function fib(n) {
        if (n < 2) return n;

        // if we have already solved this subproblem, simply return the result from the cache
        if (memoize[n]) return memoize[n];

        memoize[n] = fib(n - 1) + fib(n - 2);
        return memoize[n];
    }

    return fib(n);
};

console.log(`5th Fibonacci is ---> ${calculateFibonacci(5)}`);
console.log(`6th Fibonacci is ---> ${calculateFibonacci(6)}`);
```

## Bottom-up Dynamic Programming

Let's try to populate the `dp[]` array from the above solution, working in a bottom-up fashion. Since every fibonacci number is the sum of previous two numbers, we can use this fact to populate our array.

**Code:**

```js
const calculateFibonacci = function (n) {
    const dp = [0, 1];
    for (let i = 2; i <= n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2];
    }
    return dp[n];
};
console.log(`5th Fibonacci is ---> ${calculateFibonacci(5)}`);
console.log(`6th Fibonacci is ---> ${calculateFibonacci(6)}`);
```

The above solution has time and space complexity of O(n).

## Memory Optimization

We can optimize the space used in our previous solution. We don’t need to store all the Fibonacci numbers up to ‘n’, as we only need two previous numbers to calculate the next Fibonacci number. We can use this fact to further improve our solution:

```js
const calculateFibonacci = function (n) {
    if (n < 2) return n;

    let n1 = 0,
        n2 = 1;

    for (let i = 2; i <= n; i++) {
        let temp = n1 + n2;
        n1 = n2;
        n2 = temp;
    }
    return n2;
};

console.log(`5th Fibonacci is ---> ${calculateFibonacci(5)}`);
console.log(`6th Fibonacci is ---> ${calculateFibonacci(6)}`);
```

The above solution has a time complexity of `O(n)` but a constant space complexity `O(1)`.
