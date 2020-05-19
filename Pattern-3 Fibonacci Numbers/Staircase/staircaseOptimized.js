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
