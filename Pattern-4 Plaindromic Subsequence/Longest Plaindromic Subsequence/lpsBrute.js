let findLPSLength = (st) => {
    let findLPSLengthHelper = (st, startIndex, endIndex) => {
        if (startIndex > endIndex) return 0;

        // every sequence with one element is a palindrome of length 1
        if (startIndex === endIndex) return 1;

        // case 1: elements at beginning and end are same
        if (st[startIndex] === st[endIndex]) return 2 + findLPSLengthHelper(st, startIndex + 1, endIndex - 1);

        // case 2: skip one element either from the beginning or the end
        let c1 = findLPSLengthHelper(st, startIndex + 1, endIndex);
        let c2 = findLPSLengthHelper(st, startIndex, endIndex - 1);
        return Math.max(c1, c2);
    };
    return findLPSLengthHelper(st, 0, st.length - 1);
};

console.log('Length of LPS ---> ' + findLPSLength('abdbca'));
console.log('Length of LPS ---> ' + findLPSLength('cddpd'));
console.log('Length of LPS ---> ' + findLPSLength('pqr'));
