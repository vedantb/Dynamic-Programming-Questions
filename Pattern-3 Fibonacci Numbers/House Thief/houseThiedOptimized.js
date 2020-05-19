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
