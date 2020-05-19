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
