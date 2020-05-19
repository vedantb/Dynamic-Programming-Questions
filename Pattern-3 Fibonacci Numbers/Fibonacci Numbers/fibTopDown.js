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
