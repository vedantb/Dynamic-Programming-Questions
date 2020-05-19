const calculateFibonacci = function (n) {
    if (n < 2) return n;

    return calculateFibonacci(n - 1) + calculateFibonacci(n - 2);
};

console.log(`5th Fibonacci is ---> ${calculateFibonacci(5)}`);
console.log(`6th Fibonacci is ---> ${calculateFibonacci(6)}`);
