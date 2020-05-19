let countRibbonPieces = (ribbonLengths, total) => {
    let countRibbonPiecesRecursive = (ribbonLengths, total, currentIndex) => {
        // base check
        if (total === 0) return 0;

        if (ribbonLengths.length === 0 || currentIndex >= ribbonLengths.length) {
            return Number.MIN_VALUE;
        }

        // recursively call after selecting the ribbon length at currentIndex
        // if the ribbon length at the currentIndex exceeds the total, we shouldn't process this
        let c1 = Number.MIN_VALUE;
        if (ribbonLengths[currentIndex] <= total) {
            const result = countRibbonPiecesRecursive(ribbonLengths, total - ribbonLengths[currentIndex], currentIndex);
            if (result !== Number.MIN_VALUE) c1 = result + 1;
        }

        // recursive call after excluding the ribbon length at the currentIndex
        const c2 = countRibbonPiecesRecursive(ribbonLengths, total, currentIndex + 1);

        return Math.max(c1, c2);
    };

    const result = countRibbonPiecesRecursive(ribbonLengths, total, 0);
    return result === Number.MIN_VALUE ? -1 : result;
};

console.log(`Maximum number of ribbons: ---> ${countRibbonPieces([2, 3, 5], 5)}`);
console.log(`Maximum number of ribbons: ---> ${countRibbonPieces([2, 3], 7)}`);
console.log(`Maximum number of ribbons: ---> ${countRibbonPieces([3, 5, 7], 13)}`);
console.log(`Maximum number of ribbons: ---> ${countRibbonPieces([3, 5], 7)}`);
